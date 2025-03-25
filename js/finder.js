// 文件浏览器模块
const FileFinder = {
    initialize: function() {
        // 初始化时加载预构建的目录结构数据
        this.loadDirectoryStructure()
            .then(structure => {
                // 加载成功后渲染根目录
                this.renderRootDirectory(document.getElementById('file-explorer'));
            })
            .catch(error => {
                document.getElementById('file-explorer').innerHTML = `
                    <div class="error" style="display:block">
                        加载目录结构失败: ${error.message}<br>
                        请确保directory-structure.json文件可以访问
                    </div>
                `;
                console.error('加载目录结构失败:', error);
            });
        
        // 处理文件夹和文件点击事件
        document.getElementById('file-explorer').addEventListener('click', this.handleClick.bind(this));
    },
    
    // 渲染根目录内容
    renderRootDirectory: function(container) {
        container.innerHTML = '<div class="loading">正在加载目录结构...</div>';
        
        // 使用预构建的JSON数据渲染根目录
        this.loadDirectoryStructure()
            .then(structure => {
                // 清空容器
                container.innerHTML = '';
                
                // 如果没有内容
                if (!structure || structure.length === 0) {
                    container.innerHTML = '<div class="empty">没有文件</div>';
                    return;
                }
                
                // 创建文件列表
                structure.forEach(item => {
                    const name = item.name;
                    const itemPath = item.path;
                    const isDirectory = item.type === 'directory';
                    
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
                        请确保目录结构JSON文件可以访问
                    </div>
                `;
                console.error('加载根目录失败:', error);
            });
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
        // 直接调用MarkdownRenderer加载文件，不通过URL传递文件名
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
            folderItem.classList.add('loading');
            
            // 使用简单的setTimeout来检测加载完成
            const checkLoading = () => {
                if (!childrenContainer.querySelector('.loading')) {
                    // 内容加载完成，现在展开
                    this.completeToggle(folderItem, childrenContainer, isExpanding);
                    folderItem.classList.remove('loading');
                } else {
                    // 继续检查
                    setTimeout(checkLoading, 50);
                }
            };
            
            setTimeout(checkLoading, 50);
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
    
    // 加载目录结构数据
    loadDirectoryStructure: function() {
        // 如果已经加载过，直接返回缓存的数据
        if (this.directoryStructure) {
            return Promise.resolve(this.directoryStructure);
        }
        
        // 如果正在加载，返回正在进行的Promise
        if (this.directoryStructurePromise) {
            return this.directoryStructurePromise;
        }
        
        // 首次加载，从JSON文件获取数据
        this.directoryStructurePromise = fetch('/directory-structure.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`加载错误: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                // 缓存数据以便后续使用
                this.directoryStructure = data;
                return data;
            });
            
        return this.directoryStructurePromise;
    },
    
    // 加载目录内容
    loadDirectory: function(path, container) {
        container.innerHTML = '<div class="loading">正在加载...</div>';
        
        // 确保路径以斜杠结尾，这对于目录访问很重要
        const dirPath = path.endsWith('/') ? path : path + '/';
        
        // 从缓存的JSON数据中加载目录
        this.loadDirectoryStructure()
            .then(structure => {
                // 查找对应的目录路径
                const findItems = (items, targetPath) => {
                    if (targetPath === '/static/note/') {
                        return items;
                    }
                    
                    for (const item of items) {
                        if (item.type === 'directory' && item.path === targetPath) {
                            return item.children;
                        }
                        
                        if (item.type === 'directory' && item.children) {
                            const found = findItems(item.children, targetPath);
                            if (found) return found;
                        }
                    }
                    
                    return null;
                };
                
                const items = findItems(structure, dirPath);
                
                // 如果没有找到内容
                if (!items || items.length === 0) {
                    container.innerHTML = '<div class="empty">空目录</div>';
                    return;
                }
                
                // 清空容器
                container.innerHTML = '';
                
                // 创建文件列表
                items.forEach(item => {
                    const name = item.name;
                    const itemPath = item.path;
                    const isDirectory = item.type === 'directory';
                    
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
                        请确保目录结构JSON文件可以访问
                    </div>
                `;
                console.error('加载目录失败:', error);
            });
    }
};