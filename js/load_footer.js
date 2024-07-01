(function loadFooterStyles(filePath = './css/footer.css') {
    const headEl = document.querySelector('head');
    let headElInnerHTML = headEl.innerHTML;
    headElInnerHTML += `<link rel="stylesheet" href="${filePath}" />`;
    headEl.innerHTML = headElInnerHTML;
})();

(function loadFooter(filePath = './html/footer.html') {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Something went wrong when attempting to get the footer content. Check file path. ${response.statusText}`);
            }
            return response.text()
        })
        .then(data => {
            const footerEl = document.querySelector('footer');
            footerEl.innerHTML = data;

            document.querySelector('footer .logo').addEventListener('click', scrollToTop)
        })
        .catch(error => {
            console.error(`Something went wrong when fetching the footer content: `, error);
        })
})();

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}