// 显示指定页面，隐藏其他页面
function showPage(page) {
    // 移除所有按钮的active类
    document.querySelectorAll('.nav-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(pageElement => {
        pageElement.classList.remove('active');
    });
    
    // 显示指定的页面并添加active类
    const targetPage = document.querySelector(`#${page}`);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // 为对应的导航按钮添加active类
        const activeButton = document.querySelector(`.nav-button[data-page="${page}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
        
        // 更新浏览器历史记录（可选）
        history.pushState({ page: page }, '', `#${page}`);
    }
}

// 更新当前时间显示
function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// 添加页面切换动画效果
function addPageTransition() {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.transition = 'all 0.3s ease-in-out';
    });
}

// 处理浏览器前进后退按钮
function handlePopState(event) {
    if (event.state && event.state.page) {
        showPage(event.state.page);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 添加页面切换动画
    addPageTransition();
    
    // 更新当前时间
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    
    // 选择所有导航按钮
    document.querySelectorAll('.nav-button').forEach(button => {
        // 按钮点击时切换页面
        button.addEventListener('click', function() {
            showPage(this.dataset.page);
        });
        
        // 添加悬停效果
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            }
        });
    });
    
    // 处理浏览器前进后退按钮
    window.addEventListener('popstate', handlePopState);
    
    // 检查URL中的hash，如果有则显示对应页面
    const hash = window.location.hash.substring(1);
    if (hash && document.querySelector(`#${hash}`)) {
        showPage(hash);
    } else {
        // 初始显示 page1
        showPage('page1');
    }
    
    // 添加键盘导航支持
    document.addEventListener('keydown', function(event) {
        const activeButton = document.querySelector('.nav-button.active');
        if (!activeButton) return;
        
        const buttons = Array.from(document.querySelectorAll('.nav-button'));
        const currentIndex = buttons.indexOf(activeButton);
        
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            event.preventDefault();
            const nextIndex = (currentIndex + 1) % buttons.length;
            buttons[nextIndex].click();
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            event.preventDefault();
            const prevIndex = (currentIndex - 1 + buttons.length) % buttons.length;
            buttons[prevIndex].click();
        }
    });
    
    console.log('单页面应用初始化完成！');
    console.log('开发者：项丽妍 (20231201068)');
});