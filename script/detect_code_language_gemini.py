import os
import re
import argparse
import glob
import google.generativeai as genai
import time

genai.configure(api_key="")
model = genai.GenerativeModel('gemini-2.0-flash-lite')

def extract_code_blocks(markdown_text):
    """
    从Markdown文本中提取所有代码块
    
    Args:
        markdown_text (str): Markdown文本内容
        
    Returns:
        list: 包含所有代码块的列表，每个元素是(声明的语言, 代码内容)元组
    """
    # 匹配整个代码块：```language\ncode\n```
    pattern = r'```([^\s\n]*)\n(.*?)```'
    code_blocks = re.findall(pattern, markdown_text, re.DOTALL)
    return code_blocks

def identify_language_with_gemini(code_snippet):
    """
    使用Gemini API识别代码语言
    
    Args:
        code_snippet (str): 代码片段
        
    Returns:
        str: 识别的编程语言
    """
    # 如果代码太短或明显不是代码
    if len(code_snippet.strip()) < 10:
        return "unknown"
    
    # 构造向Gemini发送的提示词
    prompt = f"""
    请识别以下代码片段使用的编程语言。只返回语言名称，不要任何其他解释或标点。
    
    ```
    {code_snippet}
    ```
    """
    for i in range(0,5):
        try:
            # 调用Gemini API
            response = model.generate_content(prompt)
            detected_language = response.text.strip().lower()
            
            # 处理可能的复杂响应
            if "\n" in detected_language:
                detected_language = detected_language.split("\n")[0]
            
            # 删除任何额外的标点符号
            detected_language = re.sub(r'[^\w\s-]', '', detected_language)
            
            return detected_language
        except Exception as e:
            print(f"调用Gemini API时出错: {e}")
            return "unknown"

def process_markdown_file(file_path):
    """
    处理单个Markdown文件
    
    Args:
        file_path (str): Markdown文件路径
        
    Returns:
        list: 识别结果列表，每个元素是(代码块内容, 检测到的语言)
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 修改正则表达式以保留完整的代码块，包括```标记
        pattern = r'(```[^\s\n]*\n.*?```)'
        full_code_blocks = re.findall(pattern, content, re.DOTALL)
        
        # 同时提取没有```标记的代码块内容，用于语言识别
        pattern_content = r'```([^\s\n]*)\n(.*?)```'
        code_contents = re.findall(pattern_content, content, re.DOTALL)
        
        results = []
        
        for i, (_, code) in enumerate(code_contents):
            print(f"处理代码块 {i+1}/{len(code_contents)}...")
            
            # 限制代码长度，避免超出API限制
            code_sample = code[:1500] if len(code) > 1500 else code
            
            # 调用Gemini API识别语言
            detected_lang = identify_language_with_gemini(code_sample)
            
            # 保存完整的代码块和检测到的语言
            results.append((full_code_blocks[i], detected_lang))
            
            # 防止API请求过快
            if i < len(code_contents) - 1:
                time.sleep(1)
        
        return results
    except Exception as e:
        print(f"处理文件 {file_path} 时出错: {e}")
        return []

def process_directory(directory_path, recursive=False):
    """
    处理目录中的所有Markdown文件
    
    Args:
        directory_path (str): 目录路径
        recursive (bool): 是否递归搜索子目录
    """
    if recursive:
        files = glob.glob(os.path.join(directory_path, '**', '*.md'), recursive=True)
    else:
        files = glob.glob(os.path.join(directory_path, '*.md'))
    
    all_results = {}
    
    for file in files:
        print(f"\n分析文件: {file}")
        results = process_markdown_file(file)
        
        if results:
            all_results[file] = results
            
            print("识别结果:")
            for i, (code_block, detected) in enumerate(results):
                print(f"  代码块 {i+1}: 检测语言: {detected}")
                # 可以添加一个选项来显示代码块内容
                # print(f"  代码块内容:\n{code_block}")
    
    return all_results

def detect_and_rewrite_markdown(file_path):
    """
    检测代码块语言并为每个代码块加上语言标记，直接覆盖原文件
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        pattern = r'```([^\s\n]*)\n(.*?)```'
        matches = list(re.finditer(pattern, content, re.DOTALL))
        new_content = ""
        last_end = 0

        for match in matches:
            lang_decl = match.group(1)
            code = match.group(2)
            start, end = match.span()
            new_content += content[last_end:start]
            code_sample = code[:1500] if len(code) > 1500 else code
            detected_lang = identify_language_with_gemini(code_sample)
            print(f"检测到的语言: {detected_lang}")
            new_code_block = f"```{detected_lang}\n{code}```"
            new_content += new_code_block
            last_end = end
            # 速率限制，每分钟最多60次
            time.sleep(2)
        new_content += content[last_end:]

        # 覆盖原文件
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"已覆盖原文件并加上语言标记: {file_path}")
    except Exception as e:
        print(f"处理文件 {file_path} 时出错: {e}")

def main():
    parser = argparse.ArgumentParser(description='为Markdown文件中的代码块自动加上语言标记')
    parser.add_argument('path', nargs='?', default='.', help='Markdown文件或包含Markdown文件的目录路径，默认为当前目录')
    # 移除递归参数，始终递归
    args = parser.parse_args()
    path = args.path

    if os.path.isfile(path):
        if path.endswith('.md'):
            detect_and_rewrite_markdown(path)
        else:
            print(f"错误: {path} 不是Markdown文件")
    elif os.path.isdir(path):
        print(f"递归分析目录 {path} 及其子目录中的Markdown文件...")
        files = glob.glob(os.path.join(path, '**', '*.md'), recursive=True)
        for file in files:
            detect_and_rewrite_markdown(file)
    else:
        print(f"错误: {path} 路径不存在")

if __name__ == "__main__":
    main()
