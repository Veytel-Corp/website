function setPlaceholderHeight() {
    const homeEl = document.querySelector('#home');
    const navEl = document.querySelector('.intro-nav');
    const placeholderEl = document.querySelector('.placeholder');
    
    const homeHeight = homeEl.offsetHeight;
    const navHeight = navEl.offsetHeight;

    placeholderEl.style.height = homeHeight - navHeight + 'px';
}

window.addEventListener('load', setPlaceholderHeight);
window.addEventListener('resize', setPlaceholderHeight);