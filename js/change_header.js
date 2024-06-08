// const callback = (entries, observer) => {
//     entries.forEach(entry => {
//         if (!entry.isIntersecting) {
//             console.log('off the screen');
//         }
//     });
// };

// // Create an instance of IntersectionObserver
// const observer = new IntersectionObserver(callback, {
//     root: null, // Use the document's viewport as the root
//     rootMargin: '0px', // No margin
//     threshold: 0 // Trigger callback as soon as even one pixel is not visible
// });

// // Target the nav element to be observed
// setTimeout(()=> {
//     const navElement = document.querySelector('.main-menu');
//     console.log(navElement)
//     observer.observe(navElement);
// }, 0)


// console.log("adsasdasd")