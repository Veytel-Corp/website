(function loadHeaderStyles(filePath = './css/header.css') {
    const headEl = document.querySelector('head');
    let headElInnerHTML = headEl.innerHTML;
    headElInnerHTML += `
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap" rel="stylesheet"> 
    <link rel="stylesheet" href="${filePath}" /> 
    <link rel="stylesheet" href="./css/menu_modal.css" />
    `;
    headEl.innerHTML = headElInnerHTML;
})();

(function loadHeader(filePath = './html/header.html') {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Something went wrong when attempting to get the header content. Check file path. ${response.statusText}`);
            }
            return response.text()
        })
        .then(data => {
            const headerEl = document.querySelector('header');
            headerEl.innerHTML = data;
            const mainMenuEl = document.querySelector('.main-menu');
            observer.observe(mainMenuEl);

            // Logo event listeners
            const navLogos = headerEl.querySelectorAll('.toTop');
            navLogos.forEach((logo) => {
                logo.addEventListener('click', toLandingPage);
            });

            // Menu buttons event listeners
            const menuButtons = headerEl.querySelectorAll('.menu-button');
            menuButtons.forEach((button) => {
                button.addEventListener('click', toggleMenuModal);
            })

            // Menu a tag event listeners
            const menuATags = headerEl.querySelectorAll('ul.modal-nav-list li a');
            menuATags.forEach((a) => {
                a.addEventListener('click', toggleMenuModal);
            })

            const closeMenuModalEl = headerEl.querySelector('.close-modal-button');
            closeMenuModalEl.addEventListener('click', toggleMenuModal)


        })
        
        .catch(error => {
            console.error(`Something went wrong when fetching the header content: `, error);
        })
})();

function isAtBottom() {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight - 1;
}
function isWidthLessThan(width) {
    console.log(window.innerWidth)
    if(window.innerWidth <= width) return true;
    return false;
}
function toLandingPage() {
    const currentPath = window.location.pathname;
    if (currentPath === '/index.html') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
}
function toggleMenuModal() {
    const menuModalEl = document.querySelector('.menu-modal');
    if (menuModalEl.classList.contains('hidden')) {
        menuModalEl.classList.remove('hidden');
        document.body.style.overflow = 'hidden !important';
        document.body.style.position = 'fixed';
    }
    else {
        menuModalEl.classList.add('hidden');
        document.body.style.overflow = 'visible';
        document.body.style.position = 'initial';
    }
    
}
async function toggleScrollingNav() {
    if (window.scrollY === 0) {
        const scrollingNavEl = document.querySelector('.scrolling-nav');
        if(!scrollingNavEl) return false;
            const introNavEl = document.querySelector('.intro-nav');
            const mainMenuEl = document.querySelector('.main-menu');
            setTimeout(()=>{
                introNavEl.classList.remove('hidden');
                mainMenuEl.classList.remove('hidden');
            }, 10)
            scrollingNavEl.classList.remove("revealed-scrolling-nav");
    }
    if (isAtBottom()) {
        const scrollingNavEl = document.querySelector('.scrolling-nav');
        if(!scrollingNavEl || isWidthLessThan(768)) return false;
        scrollingNavEl.classList.add('hidden');
    }
    else {
        const scrollingNavEl = document.querySelector('.scrolling-nav');
        if(!scrollingNavEl) return false;
        scrollingNavEl.classList.remove('hidden')
    }
}
window.addEventListener('scroll', toggleScrollingNav);
window.addEventListener('resize', toggleScrollingNav);

const callback = (entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            const scrollingNavEl = document.querySelector('.scrolling-nav');
            const introNavEl = document.querySelector('.intro-nav');
            const mainMenuEl = document.querySelector('.main-menu');
            setTimeout(()=>{
                introNavEl.classList.add('hidden');
                mainMenuEl.classList.add('hidden');
            }, 10)
            scrollingNavEl.classList.add("revealed-scrolling-nav");
        }
    });
};
const observer = new IntersectionObserver(callback, {
    root: null,
    rootMargin: '0px',
    threshold: .7
});