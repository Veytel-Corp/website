(function env() {

    function parallaxEffect(element, speedFactor = 0.5) {
        if (!element) return;

        let lastScrollY = window.scrollY;
        let ticking = false;

        function onScroll() {
            lastScrollY = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }

        function updateParallax() {
            element.style.transform = 'translateY(' + (lastScrollY * speedFactor) + 'px)';
            ticking = false;
        }

        window.addEventListener('scroll', onScroll);
    }

    document.addEventListener('DOMContentLoaded', () => {
        const pittsburghEl = document.querySelector('#team-hero-background');
        parallaxEffect(pittsburghEl, 0.15);
    });

})()
