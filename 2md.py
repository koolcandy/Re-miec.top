import os
import glob
import random
from google import genai
import time



def gemini(text):
    api_key = random.choice([
        'AIzaSyCOqv7IMq77D6A8qQmedMEPifw2zfhR-kM',
        'AIzaSyD3kEs9_LXjw-CaFdr0t3ggMRMVE_gDOto'])
    
    client = genai.Client(api_key=api_key)

    for i in range(5):
        try:
            response = client.models.generate_content(
                model='gemini-2.0-flash',
                contents=
                f"""
                请将下面提供的 HTML 文本转换为 Markdown 文本。注意以下要求和标准：
                1. HTML 文本可能存在格式不规范的情况，需要在转换过程中修正错误，确保转换后的文本逻辑清晰、结构完整。
                2. 尽可能保留原有的文本内容和排版信息，比如标题、段落、列表、链接、图片、引用、代码块等，并将其转换为标准的 Markdown 表示方式。
                3. 不要求最终返回的文本必须严格使用 Markdown 格式语法标记（例如不需要额外包裹在 Markdown 代码块中），只要文本内容符合 Markdown 转换标准即可。
                4. 在转换过程中，如遇到模棱两可或错误的 HTML 结构，请做出合理判断并进行修正，使最终输出内容更符合常用 Markdown 的格式习惯。
                5. 输出的文本应保持清晰、易读、格式正确，且尽量遵循 Markdown 的通用写作规范。

                请按照以上标准，将下面的 HTML 文本转换成 Markdown 文本：
                {text}
                """
            )
            if response.status_code == 200 & response.text:
                return response.text

        except Exception as e:
            print(f"  谷歌 AI 接口调用失败: {str(e)}")
            time.sleep(i*2)

def to_md(directory_path):
    """
    遍历指定目录下的所有HTML文件并处理它们
    
    Args:
        directory_path: 要处理的目录路径
    """
    # 获取目录下所有的HTML文件
    html_files = glob.glob(os.path.join(directory_path, "**/*.html"), recursive=True)
    
    print(f"找到 {len(html_files)} 个HTML文件")
    
    for html_file in html_files:
        print(f"处理文件: {html_file}")
        
        try:
            # 读取HTML文件内容
            with open(html_file, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # 应用替换函数处理内容
            new_content = gemini(content)
            
            dir_name, file_name = os.path.split(html_file)
            relative_dir = os.path.relpath(dir_name, directory_path)
            
            # 确保 md_output 目录存在
            output_dir = os.path.join(directory_path, "md_output", relative_dir)
            os.makedirs(output_dir, exist_ok=True)  # 递归创建目录
            
            file_name = os.path.splitext(file_name)[0]
            new_file_name = file_name + '.md'
            new_md_file = os.path.join(output_dir, new_file_name)
            
            with open(new_md_file, 'w', encoding='utf-8') as file:
                file.write(new_content)
            
        except Exception as e:
            print(f"  处理文件时出错: {str(e)}")


if __name__ == "__main__":
    # 指定要处理的目录路径，这里使用当前脚本所在的目录
    # 你可以根据需要修改为其他目录路径
    directory_to_process = os.path.dirname(os.path.abspath(__file__))
    
    print(f"开始处理目录: {directory_to_process}")
    to_md(directory_to_process)
    print("处理完成!")