function parallaxEffect(element, speedFactor = 0.5) {
    if (!element) return;
    
    window.addEventListener('scroll', function() {
        var scrollPosition = window.scrollY || document.documentElement.scrollTop;
        element.style.transform = 'translateY(' + (scrollPosition * speedFactor) + 'px)';
    });
};

// Usage
document.addEventListener('DOMContentLoaded', () => {
    const parallaxElement = document.querySelector('#team-landing-text-con');
    parallaxEffect(parallaxElement, -0.25);
});
