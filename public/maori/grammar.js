function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

let lastScrollTop = 0;
let isNavSticky = false;

window.addEventListener('scroll', throttle(function() {
    var nav = document.querySelector('nav');
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (!(scrollTop === 0) && nav.offsetTop > 129) {
        if (!isNavSticky) {
            nav.classList.add('sticky');
            isNavSticky = true;
        }
        console.log("AHAH")
    } else {
        if (isNavSticky) {
            nav.classList.remove('sticky');
            isNavSticky = false;
        }
    }
}, 60)); // Adjust throttle limit as needed (100ms in this example