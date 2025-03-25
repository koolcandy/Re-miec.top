// 主题管理模块
const ThemeManager = {
    // 初始化主题
    initialize: function() {
        let theme = localStorage.getItem('theme');
        
        // 如果没有保存的主题，检查系统偏好
        if (!theme) {
            const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
            theme = prefersDarkScheme.matches ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
        }
        
        this.applyTheme(theme);
        
        // 添加主题切换按钮的事件监听
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', this.toggleTheme.bind(this));
        }
        
        // 监听本地存储变化
        window.addEventListener('storage', (e) => {
            if (e.key === 'theme') {
                this.applyTheme(e.newValue);
            }
        });
    },
    
    // 应用主题
    applyTheme: function(theme) {
        if (theme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            
            // 更新主题切换按钮文本
            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle) {
                themeToggle.textContent = '切换明亮模式';
            }
            
            // 更新Markdown样式
            const themeCss = document.getElementById('theme-css');
            if (themeCss) {
                themeCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.8.1/github-markdown-dark.css';
            }
        } else {
            document.body.removeAttribute('data-theme');
            
            // 更新主题切换按钮文本
            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle) {
                themeToggle.textContent = '切换暗黑模式';
            }
            
            // 更新Markdown样式
            const themeCss = document.getElementById('theme-css');
            if (themeCss) {
                themeCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.8.1/github-markdown-light.css';
            }
        }
    },
    
    // 切换主题
    toggleTheme: function() {
        const currentTheme = localStorage.getItem('theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        this.applyTheme(newTheme);
    }
};
