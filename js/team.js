(function env() {


    const isActive = {
        doEffect: true,
        threshold: NaN
    }

    isActive.toggle = function toggle() {
        if (!isActive.doEffect && window.scrollY > isActive.threshold) return;
        if (window.scrollY == 0) {
            isActive.doEffect = true;
            return;
        }
        isActive.doEffect = !isActive.doEffect;
    }

    const observer = new IntersectionObserver(isActive.toggle, {
        root: null,
        rootMargin: '0px',
        threshold: 0
    });

    function parallaxEffect(element, speedFactor = 0.5) {        
        if (!element) return;

        let lastScrollY = window.scrollY;
        let ticking = false;

        function onScroll() {
            if (!isActive.doEffect) return;
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
        observer.observe(pittsburghEl);
        parallaxEffect(pittsburghEl, 0.15);
    });

})()
