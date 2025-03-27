document.addEventListener('DOMContentLoaded', function() {
  // 检查是否已经通过验证
  const isAuthenticated = sessionStorage.getItem('authenticated');
  
  // 如果未通过验证，显示验证框
  if (!isAuthenticated) {
    showAuthPrompt();
  }
});

function showAuthPrompt() {
  // 创建遮罩层
  const overlay = document.createElement('div');
  overlay.className = 'auth-overlay';
  
  // 创建验证框
  const authBox = document.createElement('div');
  authBox.className = 'auth-box';
  
  // 验证框内容
  authBox.innerHTML = `
    <h2>验证访问</h2>
    <p>请回答以下问题以继续访问</p>
    <div class="auth-question">
      <label for="auth-answer">请输入暗号 :)</label>
      <input type="text" id="auth-answer" placeholder="请输入答案">
    </div>
    <div class="auth-buttons">
      <button id="auth-submit">提交</button>
    </div>
  `;
  
  // 添加到DOM
  overlay.appendChild(authBox);
  document.body.appendChild(overlay);
  
  // 获取输入框和按钮
  const answerInput = document.getElementById('auth-answer');
  const submitButton = document.getElementById('auth-submit');
  
  // 让输入框自动获取焦点
  answerInput.focus();
  
  // 提交按钮点击事件
  submitButton.addEventListener('click', validateAnswer);
  
  // 输入框回车事件
  answerInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      validateAnswer();
    }
  });
  
  function validateAnswer() {
    const answer = answerInput.value.trim();
    
    if (answer === 'pking666') {
      sessionStorage.setItem('authenticated', 'true');
      document.body.removeChild(overlay);
    } else {
      window.location.href = 'https://www.bilibili.com/video/BV1GJ411x7h7/';
    }
  }
}
