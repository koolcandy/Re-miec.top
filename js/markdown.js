// Markdown渲染模块
const MarkdownRenderer = {
    initialize: function() {
        marked.setOptions({
            breaks: true,
            gfm: true,
            langPrefix: "language-",
            headerIds: true,
            mangle: false,
        });
        
        // 注册高亮语言别名
        hljs.registerAliases(["asm"], { languageName: "x86asm" });
        
        this.fileInfo = document.getElementById("file-info");
        this.preview = document.getElementById("preview");
        this.loading = document.getElementById("loading");
        this.error = document.getElementById("error");
        
        // 当前加载的文件路径，不放在URL里
        this.currentFilePath = null;
        
        // 设置返回顶部按钮
        const backToTopButton = document.getElementById("back-to-top");
        if (backToTopButton) {
            window.addEventListener("scroll", () => {
                if (window.scrollY > 300) {
                    backToTopButton.style.opacity = "1";
                } else {
                    backToTopButton.style.opacity = "0";
                }
            });
            
            backToTopButton.addEventListener("click", () => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }
        
        // 监听popstate事件，以便支持浏览器的前进后退按钮
        window.addEventListener('popstate', (event) => {
            if (event.state && event.state.filePath) {
                this.loadFile(event.state.filePath, false);
            } else {
                this.loading.style.display = "none";
                this.fileInfo.textContent = "请从左侧导航选择文件";
                this.preview.innerHTML = "";
            }
        });
        
        // 初始加载时显示选择提示
        this.loading.style.display = "none";
        this.fileInfo.textContent = "请从左侧导航选择文件";
    },
    
    // 加载文件
    loadFile: function(fileName, pushState = true) {
        this.loading.style.display = "block";
        this.error.style.display = "none";
        this.preview.innerHTML = "";
        this.fileInfo.textContent = `正在加载文件: ${decodeURIComponent(fileName)}`;
        
        // 更新当前文件路径
        this.currentFilePath = fileName;
        
        // 如果需要更新浏览历史
        if (pushState) {
            // 更新浏览历史但不附加文件名到URL，而是存在state中
            window.history.pushState(
                { filePath: fileName }, 
                '', 
                window.location.pathname
            );
        }
        
        this.loadMarkdownFile(fileName)
            .then((markdown) => {
                this.fileInfo.textContent = `当前文件: ${decodeURIComponent(fileName)}`;
                this.renderMarkdown(markdown);
            })
            .catch((err) => {
                this.fileInfo.textContent = `加载失败: ${decodeURIComponent(fileName)}`;
                this.showError(err.message);
            });
    },
    
    // 加载Markdown文件
    async loadMarkdownFile(fileName) {
        try {
            const response = await fetch(fileName);
            if (!response.ok) {
                throw new Error(
                    `文件加载失败: ${response.status} ${response.statusText}`
                );
            }
            return await response.text();
        } catch (err) {
            throw new Error(`无法加载文件 "${decodeURIComponent(fileName)}": ${err.message}`);
        }
    },
    
    // 渲染Markdown内容
    async renderMarkdown(markdownContent) {
        try {
            // 解析Markdown
            const html = marked.parse(markdownContent);
            
            // 设置内容
            this.preview.innerHTML = html;
            this.loading.style.display = "none";
            
            // 安全处理外部链接
            document.querySelectorAll("#preview a").forEach((link) => {
                if (
                    link.hostname !== window.location.hostname &&
                    link.href.startsWith("http")
                ) {
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";
                }
            });
            
            // 高亮所有代码块
            document.querySelectorAll("pre code").forEach((block) => {
                hljs.highlightElement(block);
            });
            
            // 渲染数学公式
            if (typeof MathJax !== "undefined") {
                MathJax.typesetPromise().catch((err) => {
                    console.error("MathJax 渲染错误:", err);
                });
            }
            
            // 滚动到顶部
            window.scrollTo(0, 0);
        } catch (err) {
            throw new Error(`Markdown 解析失败: ${err.message}`);
        }
    },
    
    // 显示错误信息
    showError(message) {
        this.loading.style.display = "none";
        this.error.textContent = message;
        this.error.style.display = "block";
        console.error(message);
    }
};
