// 应用入口
document.addEventListener('DOMContentLoaded', function() {
    // 初始化主题管理
    ThemeManager.initialize();
    
    // 初始化文件浏览器
    FileFinder.initialize();
    
    // 初始化Markdown渲染器
    MarkdownRenderer.initialize();
    
    // 导航栏展开/收起功能
    document.getElementById('toggle-nav').addEventListener('click', function() {
        document.querySelector('.container').classList.toggle('nav-collapsed');
    });
});
