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
        
        // 获取URL中的文件参数
        const params = new URLSearchParams(window.location.search);
        const fileName = params.get("file");
        
        // 如果有文件参数，加载该文件
        if (fileName) {
            this.loadFile(fileName);
        } else {
            this.loading.style.display = "none";
            this.fileInfo.textContent = "请从左侧导航选择文件";
        }
    },
    
    // 加载文件
    loadFile: function(fileName) {
        // 更新URL，但不刷新页面
        const newUrl = new URL(window.location.href);
        if (newUrl.searchParams.get('file') !== fileName) {
            newUrl.searchParams.set('file', fileName);
            window.history.pushState({}, '', newUrl);
        }
        
        this.loading.style.display = "block";
        this.error.style.display = "none";
        this.preview.innerHTML = "";
        this.fileInfo.textContent = `正在加载文件: ${decodeURIComponent(fileName)}`;
        
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
            
            // 处理图片点击放大
            document.querySelectorAll("#preview img").forEach((img) => {
                img.style.cursor = "pointer";
                img.title = "点击查看原始尺寸";
                img.addEventListener("click", () => {
                    window.open(img.src, "_blank");
                });
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
