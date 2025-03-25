import requests
from urllib.parse import urljoin
from bs4 import BeautifulSoup
import os
import time
from tqdm import tqdm
from urllib.parse import unquote

# 配置请求头模拟浏览器
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

class Note:
    def __init__(self, link):
        self.link = link
        self.name = ""
        self.content = ""
        self.path = []
        
    def set_content(self, name, content, path):
        self.name = name
        self.content = content
        self.path = path
        
    def __eq__(self, other):
        if not isinstance(other, Note):
            return False
        return self.link == other.link
        
    def __hash__(self):
        return hash(self.link)

def get_with_retry(url, max_retries=10, timeout=20, delay=5):
    """带重试机制的请求函数"""
    for i in range(max_retries):
        try:
            response = requests.get(url, headers=headers, timeout=timeout)
            response.encoding = 'utf-8'  # 明确设置响应编码为UTF-8
            response.raise_for_status()  # 检查HTTP错误
            return response
        except requests.exceptions.RequestException as e:
            print(f"请求错误 (尝试 {i+1}/{max_retries}): {url}, 错误: {e}")
            if i < max_retries - 1:  # 如果不是最后一次尝试，则等待后重试
                time.sleep(delay)
    return None

def get_links(url):
    """从初始页面提取所有链接"""
    response = get_with_retry(url)
    if not response:
        print(f"错误：无法获取页面 {url}")
        return []
    
    soup = BeautifulSoup(response.text, 'html.parser')
    navigator = soup.find("ul", class_="md-nav__list")

    if not navigator:
        print("未找到 class 为 md-nav__list 的导航容器")
        return []
    
    links = []
    for a_tag in navigator.find_all('a', href=True):
        href = a_tag['href']
        absolute_url = urljoin(url, href)  # 处理相对路径
        links.append(Note(absolute_url))
    
    return links

def extract_data(url):
    """从单个链接提取正文和标题"""
    response = get_with_retry(url)
    if not response:
        print(f"错误：无法获取页面 {url}")
        return None, None, None
    
    soup = BeautifulSoup(response.text, 'html.parser')
    text = soup.find('article', class_='md-content__inner md-typeset').prettify
    title = soup.find('title').text.replace(" - MIEC CSSE 课程笔记", "") if soup.find('title') else "无标题"
    path = unquote(url).split("/")[-3:-2]
    
    return text, title, path

def save_content_to_file(note_obj, output_dir="output"):
    """保存笔记内容到文件"""
    try:
        # 创建安全的文件名
        safe_title = note_obj.name.replace(" ", "_").replace("/", "_").replace(":", "_")
        
        # 构建完整的目录路径(包括子目录)
        if note_obj.path:
            # 确保路径中的每个部分都是安全的文件系统名称
            safe_path = [part.replace(":", "_").replace("?", "_").replace("=", "_") 
                        for part in note_obj.path]
            # 构建子目录路径
            subdir = os.path.join(output_dir, *safe_path)
        else:
            subdir = output_dir
        
        # 创建所有必要的目录
        os.makedirs(subdir, exist_ok=True)
        
        # 完整文件路径
        filename = os.path.join(subdir, f"{safe_title}.html")
        
        # 写入内容
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(note_obj.content)
        
        return filename
    except Exception as e:
        print(f"保存文件失败: {e}, 路径: {os.path.join(output_dir, *note_obj.path) if note_obj.path else output_dir}")
        return None

def main():
    start_url = "https://web.archive.org/web/20250305170026/https://miec.top/"
    output_dir = "miec_output"  # 输出目录
    
    print(f"正在爬取网站: {start_url}")
    
    # 获取所有链接
    links = get_links(start_url)
    if not links:
        print("未获取到任何链接")
        return
    
    # 去重
    unique_links = list(set(links))
    print(f"发现 {len(unique_links)} 个唯一链接")
    
    # 创建输出目录
    os.makedirs(output_dir, exist_ok=True)
    
    # 使用进度条
    for link in tqdm(unique_links, desc="爬取进度"):
        content, title, path = extract_data(link.link)
        
        if content and title:
            link.set_content(title, str(content), path)
            
            # 保存到文件
            filename = save_content_to_file(link, output_dir)
            if filename:
                tqdm.write(f"已保存: {title} -> {filename}")
            else:
                tqdm.write(f"保存失败: {title}")
        else:
            tqdm.write(f"提取内容失败: {link.link}")
            
    print(f"爬取完成! 所有内容已保存到 {os.path.abspath(output_dir)} 目录")

if __name__ == "__main__":
    main()