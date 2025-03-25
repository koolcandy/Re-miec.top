// 文件浏览器模块
const FileFinder = {
    initialize: function() {
        // 直接加载 notes 目录
        this.loadDirectory('/public/notes/', document.getElementById('file-explorer'));
        
        // 处理文件夹和文件点击事件
        document.getElementById('file-explorer').addEventListener('click', this.handleClick.bind(this));
    },
    
    // 处理点击事件
    handleClick: function(e) {
        // 处理点击展开图标
        if (e.target.classList.contains('folder-toggle')) {
            this.toggleFolder(e.target.closest('.directory-item'));
        }
        // 处理点击文件夹名称
        else if (e.target.classList.contains('folder')) {
            this.toggleFolder(e.target.closest('.directory-item'));
        }
        // 处理文件点击
        else if (e.target.classList.contains('file')) {
            e.preventDefault();
            const filePath = e.target.closest('a').getAttribute('href');
            
            // 触发文件打开事件
            this.openFile(filePath);
            return false;
        }
    },
    
    // 打开文件
    openFile: function(filePath) {
        // 更新Markdown渲染区域
        MarkdownRenderer.loadFile(filePath);
    },
    
    // 根据原始名称获取自定义显示名称
    getDisplayName: function(originalName) {

        if (nameMapping[originalName]) {
            return nameMapping[originalName];
        }
        
        return originalName;
    },
    
    // 切换文件夹展开/折叠状态
    toggleFolder: function(folderItem) {
        if (!folderItem) return;
        
        const folderPath = folderItem.getAttribute('data-path');
        const childrenContainer = folderItem.querySelector('.children');
        
        // 切换展开状态
        const isExpanding = !folderItem.classList.contains('expanded');
        
        // 如果是第一次展开，先加载内容
        if (isExpanding && childrenContainer && !childrenContainer.hasChildNodes()) {
            this.loadDirectory(folderPath, childrenContainer);
            // 加载后再处理展开逻辑
            folderItem.classList.add('loading');
            
            // 使用MutationObserver监听子元素变化，当内容加载完成后展开
            const observer = new MutationObserver((mutations) => {
                for (const mutation of mutations) {
                    if (mutation.type === 'childList' && !childrenContainer.querySelector('.loading')) {
                        // 内容加载完成，现在展开
                        this.completeToggle(folderItem, childrenContainer, isExpanding);
                        observer.disconnect();
                        folderItem.classList.remove('loading');
                        break;
                    }
                }
            });
            
            observer.observe(childrenContainer, { childList: true, subtree: true });
            return;
        }
        
        // 对于已加载的文件夹，直接执行展开/折叠
        this.completeToggle(folderItem, childrenContainer, isExpanding);
    },

    completeToggle: function(folderItem, childrenContainer, isExpanding) {
        folderItem.classList.toggle('expanded', isExpanding);
        
        if (!childrenContainer) return;
        
        if (isExpanding) {
            // 先测量内容的真实高度
            childrenContainer.style.position = 'absolute';
            childrenContainer.style.visibility = 'hidden';
            childrenContainer.style.maxHeight = 'none';
            const targetHeight = childrenContainer.scrollHeight;
            
            // 重置为折叠状态
            childrenContainer.style.position = '';
            childrenContainer.style.visibility = '';
            childrenContainer.style.maxHeight = '0';
            childrenContainer.style.overflow = 'hidden';
            
            // 强制回流，然后设置目标高度
            setTimeout(() => {
                childrenContainer.style.maxHeight = targetHeight + 'px';
                
                // 完成过渡后移除限制
                setTimeout(() => {
                    childrenContainer.style.maxHeight = 'none';
                    childrenContainer.style.overflow = '';
                    
                    // 滚动到可见区域
                    childrenContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 300);
            }, 10);
        } else {
            // 折叠前先设置当前高度，以便平滑过渡
            childrenContainer.style.overflow = 'hidden';
            childrenContainer.style.maxHeight = childrenContainer.scrollHeight + 'px';
            
            // 强制回流，然后设置为0
            setTimeout(() => {
                childrenContainer.style.maxHeight = '0';
            }, 10);
        }
    },
    
    // 加载目录内容
    loadDirectory: function(path, container) {
        container.innerHTML = '<div class="loading">正在加载...</div>';
        
        // 确保路径以斜杠结尾，这对于目录访问很重要
        const dirPath = path.endsWith('/') ? path : path + '/';
        
        // 直接请求目录内容
        fetch(dirPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`加载错误: ${response.status} ${response.statusText}`);
                }
                return response.text();
            })
            .then(htmlContent => {
                // 解析HTML内容以获取目录列表
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlContent, 'text/html');
                const items = Array.from(doc.querySelectorAll('a')).filter(a => {
                    const href = a.getAttribute('href');
                    // 过滤掉父目录链接和当前目录链接
                    return !(href.endsWith('/..') || href.endsWith('/.') || href === '../' || href === './');
                });
                
                // 如果没有内容
                if (items.length === 0) {
                    container.innerHTML = '<div class="empty">空目录</div>';
                    return;
                }
                
                // 清空容器
                container.innerHTML = '';
                
                // 创建文件列表
                items.forEach(a => {
                    const href = a.getAttribute('href');
                    const name = a.textContent.trim();
                    
                    // 确定是否为目录（通常以斜杠结尾）
                    const isDirectory = href.endsWith('/');
                    
                    // 生成完整路径
                    // 如果href是相对路径，我们需要基于当前目录构建完整路径
                    let itemPath;
                    if (href.startsWith('/')) {
                        // 绝对路径
                        itemPath = href;
                    } else if (href.startsWith('http')) {
                        // 完整URL，可能不太可能出现在这里
                        itemPath = href;
                    } else {
                        // 相对路径，基于当前目录
                        // 移除路径中可能存在的 './' 前缀
                        const cleanHref = href.replace(/^\.\//, '');
                        // 确保目录路径以斜杠结尾
                        itemPath = dirPath + cleanHref;
                    }
                    
                    const itemElement = document.createElement('div');
                    const displayName = this.getDisplayName(name);
                    
                    if (isDirectory) {
                        itemElement.className = 'file-item directory-item';
                        itemElement.setAttribute('data-path', itemPath);
                        itemElement.innerHTML = `
                            <span class="folder-toggle">▶</span>
                            <span class="folder">${displayName}</span>
                            <div class="children"></div>
                        `;
                    } else {
                        itemElement.className = 'file-item';
                        itemElement.innerHTML = `
                            <a href="${itemPath}" class="file">
                                ${displayName}
                            </a>
                        `;
                    }
                    
                    container.appendChild(itemElement);
                });
            })
            .catch(error => {
                container.innerHTML = `
                    <div class="error" style="display:block">
                        加载失败: ${error.message}<br>
                        请确保目录可以访问
                    </div>
                `;
                console.error('加载目录失败:', error);
            });
    }
};