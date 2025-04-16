const { useState, useEffect, useRef } = React;

// 文件名工具提示组件
const FileTooltip = () => {
  const tooltipRef = useRef(null);
  
  useEffect(() => {
    // 创建工具提示元素
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'file-tooltip';
    document.body.appendChild(tooltipElement);
    tooltipRef.current = tooltipElement;
    
    // 鼠标进入文件项时显示工具提示
    const handleMouseEnter = (e) => {
      // 只对文件名元素生效，不包括目录
      if (e.target.classList.contains('name') && e.target.closest('.file-item')) {
        const fileName = e.target.textContent;
        tooltipElement.textContent = fileName;
        tooltipElement.classList.add('visible');
        
        // 更新工具提示位置到鼠标右下方
        updateTooltipPosition(e);
      }
    };
    
    // 鼠标移动时更新工具提示位置
    const handleMouseMove = (e) => {
      if (tooltipElement.classList.contains('visible')) {
        updateTooltipPosition(e);
      }
    };
    
    // 鼠标离开时隐藏工具提示
    const handleMouseLeave = () => {
      tooltipElement.classList.remove('visible');
    };
    
    // 更新工具提示位置的函数
    const updateTooltipPosition = (e) => {
      // 定位到鼠标右下方
      const posX = e.clientX + 15;
      const posY = e.clientY + 15;
      
      // 确保提示框不超出屏幕边界
      const tooltipWidth = tooltipElement.offsetWidth;
      const tooltipHeight = tooltipElement.offsetHeight;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      let finalX = posX;
      let finalY = posY;
      
      // 检查右侧边界
      if (posX + tooltipWidth > viewportWidth) {
        finalX = posX - tooltipWidth - 10;
      }
      
      // 检查底部边界
      if (posY + tooltipHeight > viewportHeight) {
        finalY = posY - tooltipHeight - 10;
      }
      
      tooltipElement.style.left = `${finalX}px`;
      tooltipElement.style.top = `${finalY}px`;
    };
    
    // 添加事件监听器
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseout', handleMouseLeave);
    
    // 清理事件监听器
    return () => {
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseout', handleMouseLeave);
      document.body.removeChild(tooltipElement);
    };
  }, []);
  
  return null;
};

// Helper component for directory tree
const DirectoryTree = ({ node, currentPath, onSelect, expandedPaths, onToggleExpand }) => {
  const isExpanded = expandedPaths.includes(node.path);
  
  const handleClick = () => {
    if (node.type === 'directory') {
      onToggleExpand(node.path);
    }
    onSelect(node);
  };
  
  return (
    <div>
      <div
        className={`${node.type === 'directory' ? 'directory-item' : 'file-item'} ${currentPath === node.path ? 'active' : ''}`}
        onClick={handleClick}
      >
        <div className="icon">
          {node.type === 'directory' ? (
            <i className={`fas fa-folder${isExpanded ? '-open' : ''}`}></i>
          ) : (
            <i className="fas fa-file-alt"></i>
          )}
        </div>
        <div className="name">{node.name}</div>
        {node.type === 'directory' && (
          <div className="icon">
            <i className={`fas fa-chevron-${isExpanded ? 'down' : 'right'}`}></i>
          </div>
        )}
      </div>
      
      {isExpanded && node.type === 'directory' && (
        <div className="directory-contents">
          {(node.children || []).map(child => (
            <DirectoryTree
              key={child.path}
              node={child}
              currentPath={currentPath}
              onSelect={onSelect}
              expandedPaths={expandedPaths}
              onToggleExpand={onToggleExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
};

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentPath, setCurrentPath] = useState('/static/note/');
  const [directoryStructure, setDirectoryStructure] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedPaths, setExpandedPaths] = useState(['/static/note/']);
  const markdownRef = useRef(null);
  // Removed unused isResizing state
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  // 处理目录展开/折叠
  const handleToggleExpand = (path) => {
    setExpandedPaths(prevPaths => {
      if (prevPaths.includes(path)) {
        return prevPaths.filter(p => p !== path);
      } else {
        return [...prevPaths, path];
      }
    });
  };

  // 处理导航栏展开/收起
  const toggleNav = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };
  
  // Load initial directory structure
  useEffect(() => {
    const loadStructure = async () => {
      try {
        const response = await fetch('/directory-structure.json');
        const data = await response.json();
        setDirectoryStructure({
          name: 'note',
          path: '/static/note/',
          type: 'directory',
          children: data
        });
      } catch (error) {
        console.error('Error loading directory structure:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadStructure();
  }, []);
  
  // Handle file/directory selection
  const handleSelect = async (node) => {
    if (node.type === 'file') {
      setCurrentPath(node.path);
      
      setSelectedFile(null);
      setIsLoading(true);
      
      if (markdownRef.current) {
        markdownRef.current.innerHTML = '';
      }
      
      try {
        const response = await fetch(node.path);
        const content = await response.text();
        
        setSelectedFile({
          ...node,
          content
        });
      } catch (error) {
        console.error('Error loading file:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setCurrentPath(node.path);
    }
  };
  
  // Process markdown and apply syntax highlighting/MathJax
  useEffect(() => {
    if (!selectedFile || isLoading) return;
    
    const processedMarkdown = marked.parse(selectedFile.content, {
      breaks: true,
      gfm: true
    });
    
    markdownRef.current.innerHTML = processedMarkdown;
    
    hljs.registerAliases(["asm"], { languageName: "x86asm" });
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
    });
    
    if (window.MathJax) {
      window.MathJax.typesetPromise();
    }
  }, [selectedFile, isLoading]);
  
  if (!directoryStructure) {
    return (
      <div className="loading-initial">
        <div className="spinner"></div>
      </div>
    );
  }
  
  return (
    <>
      <FileTooltip />
      <div className={`sidebar ${isNavCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <i className="fas fa-file-code"></i>
          </div>
          <h2>Re0: meic.top</h2>
        </div>
        
        <div className="directory-path">
          <i className="fas fa-file-alt"></i>
          <div className="path">{selectedFile ? selectedFile.name : "无文件选择"}</div>
        </div>
        
        <div className="file-explorer">
          <DirectoryTree
            node={directoryStructure}
            currentPath={currentPath}
            onSelect={handleSelect}
            expandedPaths={expandedPaths}
            onToggleExpand={handleToggleExpand}
          />
        </div>
      </div>
      
      <div className={`resizer ${isNavCollapsed ? 'collapsed' : ''}`}>
        <div className="toggle-btn" onClick={toggleNav}>
          <i className={`fas fa-chevron-${isNavCollapsed ? 'right' : 'left'}`}></i>
        </div>
      </div>

      <div className={`main-content ${isNavCollapsed ? 'expanded' : ''}`}>
        {selectedFile === null && isLoading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : selectedFile ? (
          <div className="markdown-container">
            <div className="markdown-content" ref={markdownRef}></div>
          </div>
        ) : (
          <div className="empty-state">
            <div className="icon">
              <i className="fas fa-file-alt"></i>
            </div>
            <h3>No file selected</h3>
          </div>
        )}
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
