(function loadUnderConstructionModal(filePath = './css/modals/underConstruction.css') {
    const headEl = document.querySelector('head');
    let headElInnerHTML = headEl.innerHTML;
    headElInnerHTML += `<link rel="stylesheet" href="${filePath}" />`;
    headEl.innerHTML = headElInnerHTML;
})();

(function loadUnderConstructionModal(filePath = './html/modals/underConstruction.html') {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Something went wrong when attempting to get the under construction modal content. Check file path. ${response.statusText}`);
            }
            return response.text()
        })
        .then(data => {
            const modalEl = document.querySelector('.under-construction-modal');
            modalEl.innerHTML = data;
            modalEl.addEventListener('click', toggleUnderConstructionModal);
            setUnderConstructionModalOpeners();
        })
        .catch(error => {
            console.error(`Something went wrong when fetching the under construction modal content: `, error);
        })
})();

function toggleUnderConstructionModal() {
    const modalEl = document.querySelector('.under-construction-modal');
    modalEl.classList.toggle('hidden');
}

function setUnderConstructionModalOpeners() {
    const buttons = document.querySelectorAll('.open-under-construction-modal');
    buttons.forEach((button) => {
        button.addEventListener('click', toggleUnderConstructionModal);
    })
}

