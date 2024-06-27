console.log("Staging Site - v1.8");


(function loadHead(filePath = './css/header/header.css') {
    const headEl = document.querySelector('head');
    let headElInnerHTML = headEl.innerHTML;
    headElInnerHTML += `
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap" rel="stylesheet"> 
    <link rel="stylesheet" href="${filePath}" /> 
    <link rel="stylesheet" href="./css/header/menu_modal.css" />
    <link rel="stylesheet" href="./css/header/mobile_menu_modal.css" />
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

            const toLandingElements = document.querySelectorAll('a[href*="#landing"]');

            toLandingElements.forEach((el)=> {
                el.addEventListener('click', toLandingPage);
            })

            const mainMenuEl = document.querySelector('.main-menu');

            observer.observe(mainMenuEl);

            // Logo event listeners
            const navLogos = headerEl.querySelectorAll('.toTop');
            navLogos.forEach((logo) => {
                logo.addEventListener('click', toLandingPage);
            });

            // Menu buttons event listeners
            const menuButtons = headerEl.querySelectorAll('.toggle-menu-modal');
            menuButtons.forEach((button) => {
                button.addEventListener('click', toggleMenuModal);
            })

            // Menu a tag event listeners
            const menuATags = headerEl.querySelectorAll('ul.modal-nav-list li a, .mobile-menu-modal ul li a');
            menuATags.forEach((a) => {
                a.addEventListener('click', toggleMenuModal);
            })

            const closeMenuModalEl = headerEl.querySelector('.close-menu-modal-button');
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
    if(window.innerWidth <= width) return true;
    return false;
}
function toLandingPage() {
    const currentPath = window.location.pathname;
    if (currentPath.includes('/index.html')) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
}
function toggleMenuModal() {
    const menuModalEl = document.querySelector('.menu-modal');
    const mobileMenuModalEl = document.querySelector('.mobile-menu-modal');

    menuModalEl.classList.toggle('hidden');
    mobileMenuModalEl.classList.toggle('hidden');

    if (menuModalEl.classList.contains('hidden')) enableScroll();
    else disableScroll();
    
}

function disableScroll() {
    // Get the current page scroll position
    scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop;
    scrollLeft =
        window.scrollX ||
        document.documentElement.scrollLeft,

        // if any scroll is attempted,
        // set this to the previous value
        window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
        };
}

function enableScroll() {
    window.onscroll = function () { };
}

async function toggleScrollingNav() {
    const pathname = window.location.pathname;
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
    if (pathname != "/contact.html" && isAtBottom()) {
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
function setPlaceholderHeight() {
    
    if (!isIndexPage()) return false;

    const homeEl = document.querySelector('#landing');
    const navEl = document.querySelector('.intro-nav');
    const placeholderEl = document.querySelector('.placeholder');

    const homeHeight = homeEl.offsetHeight;

    if(!navEl || !homeEl || !placeholderEl) {
        placeholderEl.style.height = "100vh";
        console.log(`Required element not found when calling setPlaceholderHeight: ${ 
            !homeEl ? '#landing' : !navEl ? '.intro-nav' : '.placeholder' 
        }. Invoking function again in .5 seconds.`
        );
        setTimeout(setPlaceholderHeight, 500);
        return false;
    }
    
    const navHeight = navEl.offsetHeight;
    placeholderEl.style.height = homeHeight - navHeight + 'px';

    return true;
}

function isIndexPage() {
    const pathname = window.location.pathname;
    if (pathname === '/' || pathname.endsWith('index.html') || pathname.endsWith('/staging/') || pathname.includes('index.html#')) {
        return true;
    } else {
        return false;
    }
}
window.addEventListener('scroll', toggleScrollingNav);
window.addEventListener('resize', toggleScrollingNav);

window.addEventListener('resize', setPlaceholderHeight);
window.addEventListener('DOMContentLoaded', setPlaceholderHeight);

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