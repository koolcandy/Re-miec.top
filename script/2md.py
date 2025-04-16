import os
import glob
import time
from markdownify import markdownify as md


def gemini(text):
    """
    使用 markdownify 将 HTML 文本转换为 Markdown 文本
    """
    return md(text)


def to_md(directory_path):
    """
    遍历指定目录下的所有HTML文件并处理它们
    
    Args:
        directory_path: 要处理的目录路径
    """
    # 获取目录下所有的HTML文件
    html_files = glob.glob(os.path.join(directory_path, "../**/*.html"), recursive=True)
    
    print(f"找到 {len(html_files)} 个HTML文件")
    
    for html_file in html_files:
        print(f"处理文件: {html_file}")
        
        try:
            # 读取HTML文件内容
            with open(html_file, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # 去除最后一个 "<"
            last_index = content.rfind("<")
            if last_index != -1:
                content = content[:last_index]
            
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