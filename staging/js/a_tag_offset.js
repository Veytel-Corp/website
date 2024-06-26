function setAnchorOffset() {
    const anchorTags = document.querySelectorAll(`a[href*="#"]`);
    anchorTags.forEach((a) => {
        a.addEventListener('click', (e)=> {
            if (window.innerWidth >= 600) return;
            e.preventDefault();
            const targetId = a.getAttribute('href').split("#")[1];
            const targetElement = document.getElementById(targetId);
            const offset = 60; // Adjust this value to your header height

            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition - offset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        })
    })
}