// function setPlaceholderHeight() {
    
//     const homeEl = document.querySelector('#landing');
//     const navEl = document.querySelector('.intro-nav');
//     const placeholderEl = document.querySelector('.placeholder');

//     const homeHeight = homeEl.offsetHeight;

//     if(!navEl) {
//         console.error("No element with class intro-nav found at the time of call.");
//         return false;
//     }
    
//     const navHeight = navEl.offsetHeight;

//     placeholderEl.style.height = homeHeight - navHeight + 'px';
// }

// // setTimeout(setPlaceholderHeight(), 100);
// // setPlaceholderHeight();
// // console.log('help')
// window.addEventListener('load', setPlaceholderHeight);
// window.addEventListener('resize', setPlaceholderHeight);