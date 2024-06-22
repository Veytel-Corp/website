(function loadAboutModalHeaderContent(filePath = './css/modals/about.css') {
    const headEl = document.querySelector('head');
    let headElInnerHTML = headEl.innerHTML;
    headElInnerHTML += `<link rel="stylesheet" href="${filePath}" />`;
    headEl.innerHTML = headElInnerHTML;
    console.log(document.querySelector('head'))
})();

(function loadAboutModal(filePath = './html/modals/about.html') {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Something went wrong when attempting to get the under about modal content. Check file path. ${response.statusText}`);
            }
            return response.text()
        })
        .then(data => {
            const modalEl = document.querySelector('.about-modal');
            if (!modalEl) {
                console.error('No element with class about-modal found.')
                return false;
            }
            modalEl.innerHTML = data;
            modalEl.addEventListener('click', toggleAboutModal);
            modalEl.querySelector('button').addEventListener('click', toggleLearnMoreModal);
            setAboutModalOpeners();
        })
        .catch(error => {
            console.error(`Something went wrong when fetching the about modal content: `, error);
        })
})();

function toggleAboutModal() {
    const modalEl = document.querySelector('.about-modal');
    modalEl.classList.toggle('hidden');
}

function setAboutModalOpeners() {
    const buttons = document.querySelectorAll('.open-about-modal');
    buttons.forEach((button) => {
        button.addEventListener('click', toggleAboutModal);
    })
}

