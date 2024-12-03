(function () {
    document.addEventListener('DOMContentLoaded', () => {
        const menuItems = document.querySelectorAll('.header__menu-item a');
        const currentPath = window.location.pathname.split('/').pop();

        console.log('Текущий путь:', currentPath);

        menuItems.forEach(item => {
            const href = item.getAttribute('href');
            console.log('Сравнение:', href, 'vs', currentPath);

            if (href === currentPath) {
                console.log('Активный элемент:', href);
                item.classList.add('active-menu');
            }
        });
    });



    window.addEventListener('load', () => {
        const footerStats = document.querySelector('.footer__stats');
        const loadTime = (window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart);
        if (footerStats) {
            footerStats.textContent = `Время загрузки страницы: ${loadTime} милисекунд`;
        }
    });
})();
