const { useState, useEffect, useRef } = React;

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
  // 新增：拖动分隔条相关状态与引用
  const resizerRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);

  // 处理目录展开/折叠
  const handleToggleExpand = (path) => {
    setExpandedPaths(prevPaths => {
      if (prevPaths.includes(path)) {
        // 如果已展开，则折叠
        return prevPaths.filter(p => p !== path);
      } else {
        // 如果已折叠，则展开
        return [...prevPaths, path];
      }
    });
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
      
      setSelectedFile(null); // 清除当前文件
      setIsLoading(true);    // 设置加载状态
      
      // Clear current content
      if (markdownRef.current) {
        markdownRef.current.innerHTML = '';
      }
      
      try {
        // Fetch file content from server
        const response = await fetch(node.path);
        const content = await response.text();
        
        setSelectedFile({
          ...node,
          content
        });
      } catch (error) {
        console.error('Error loading file:', error);
        // Handle error state if needed
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
    
    // Process markdown
    const processedMarkdown = marked.parse(selectedFile.content, {
      breaks: true,
      gfm: true
    });
    
    // Set the HTML content
    markdownRef.current.innerHTML = processedMarkdown;
    
    // Apply syntax highlighting
    hljs.registerAliases(["asm"], { languageName: "x86asm" });
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
    });
    
    // Tell MathJax to typeset the new content
    if (window.MathJax) {
      window.MathJax.typesetPromise();
    }
  }, [selectedFile, isLoading]);

  // 处理鼠标拖动事件，更新 --sidebar-width
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      let newWidth = e.clientX;
      newWidth = Math.max(newWidth, 400);
      newWidth = Math.min(newWidth, window.innerWidth * 0.7);
      document.documentElement.style.setProperty('--sidebar-width', `${newWidth}px`);
    };
    const handleMouseUp = () => setIsResizing(false);
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const handleMouseDown = () => setIsResizing(true);
  
  if (!directoryStructure) {
    return (
      <div className="loading-initial">
        <div className="spinner"></div>
      </div>
    );
  }
  
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <i className="fas fa-file-code"></i>
          </div>
          <h2>Re0: meic.tip</h2>
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
      
      <div 
        className="resizer" 
        ref={resizerRef} 
        onMouseDown={handleMouseDown}
      ></div>

      <div className="main-content">
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
