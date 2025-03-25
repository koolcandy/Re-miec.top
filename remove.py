import re
import os
import glob
from pathlib import Path

def replace_wayback_machine_prefix(text):
    """
    替换文本中 Wayback Machine 的图片 URL 前缀 (https://web.archive.org/web/<xxx>/) 为空字符串。

    Args:
        text: 包含 Wayback Machine URL 的文本。

    Returns:
        替换后的文本。
    """
    
    pattern = r'https://web\.archive\.org/web/\.*/'
    return re.sub(pattern, "", text)

def process_html_files(directory_path):
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
            new_content = replace_wayback_machine_prefix(content)
            
            # 如果内容有变化，则写回文件
            if new_content != content:
                with open(html_file, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                print(f"  已更新文件内容")
            else:
                print(f"  文件内容未变化")
                
        except Exception as e:
            print(f"  处理文件时出错: {str(e)}")

if __name__ == "__main__":
    # 指定要处理的目录路径，这里使用当前脚本所在的目录
    # 你可以根据需要修改为其他目录路径
    directory_to_process = os.path.dirname(os.path.abspath(__file__))
    
    print(f"开始处理目录: {directory_to_process}")
    process_html_files(directory_to_process)
    print("处理完成!")