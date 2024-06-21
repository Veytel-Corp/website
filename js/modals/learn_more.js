(function loadLearnMoreModalHeaderContent(filePath = './css/modals/learnMore.css') {
    const headEl = document.querySelector('head');
    let headElInnerHTML = headEl.innerHTML;
    headElInnerHTML += `<link rel="stylesheet" href="${filePath}" />`;
    headEl.innerHTML = headElInnerHTML;
    console.log(document.querySelector('head'))
})();

(function loadLearnMoreModal(filePath = './html/modals/learnMore.html') {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Something went wrong when attempting to get the under learn more modal content. Check file path. ${response.statusText}`);
            }
            return response.text()
        })
        .then(data => {
            const modalEl = document.querySelector('.learn-more-modal');
            if (!modalEl) {
                console.error('No element with class learn-more-modal found.')
                return false;
            }
            modalEl.innerHTML = data;
            modalEl.addEventListener('click', toggleLearnMoreModal);
            setLearnMoreModalModalOpeners();
        })
        .catch(error => {
            console.error(`Something went wrong when fetching the learn more modal content: `, error);
        })
})();

function toggleLearnMoreModal() {
    const modalEl = document.querySelector('.learn-more-modal');
    modalEl.classList.toggle('hidden');
}

function setLearnMoreModalModalOpeners() {
    const buttons = document.querySelectorAll('.open-learn-more-modal');
    buttons.forEach((button) => {
        button.addEventListener('click', toggleLearnMoreModal);
    })
}

