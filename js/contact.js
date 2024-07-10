// NOTE IF YOU ARE LOOKING FOR THE FORM SUBMISSION SCRIPT IT IS LOCATED IN GOOGLE SHEETS USING THE APP SCRIPTS API

const formEl = document.querySelector('form');
const mainEl = document.querySelector('main');
const thankYouEl = document.querySelector('.thank-you');
const somethingWentWrongEl = document.querySelector('.something-went-wrong');
const loaderEl = document.querySelector('.loader-con');

formEl.addEventListener('submit', async (e)=> {
    e.preventDefault();

    const formData = new FormData(formEl);
        const formObject = Object.fromEntries(formData.entries());

        try {
            const requestURL = "https://script.google.com/macros/s/AKfycby22ij9ioLxPK8tXGpKyJy5j_eqDyXHpoDZPVpLMv7XtRvT7WjqZ88sY_Uyw539Ygzl/exec";
            loaderEl.classList.remove('hidden');
            const response = await fetch(requestURL, {
                method: 'POST',
                body: new URLSearchParams(formObject)
            });
            const data = await response.json();

            if (data.status === 'success') {
                formEl.reset();
                mainEl.classList.add('hidden');
                thankYouEl.classList.remove('hidden');
                loaderEl.classList.add('hidden');
            }
        } catch (err) {
            console.error(err);
            loaderEl.classList.add('hidden');
            somethingWentWrongEl.classList.remove('hidden');
        }
});

const textAreaEl = document.getElementById("message");
const charCountEl = document.getElementById("char-count");

const charCounter = {
    count: 0,
    maxCount: 800
}
charCounter.setCharCount = (count = false) => {
    if (Number.isInteger*(count)) {
        charCounter.count = count;
    }
    else {
        charCounter.count = textAreaEl.value.length;
    }
}
charCounter.updateDOM = (toMax = false) => {
    if (toMax) {
        const text = textAreaEl.value;
        textAreaEl.value = text.substring(0, charCounter.maxCount);
        charCounter.setCharCount(charCounter.maxCount);
        charCounter.updateDOM();
        return true;
    }
    charCountEl.innerText = `Character Count: ${charCounter.count}/${charCounter.maxCount}`;
    return true;
}
charCounter.isMax = () => {
    if (charCounter.count >= charCounter.maxCount) {
        charCounter.updateDOM(true);
        return true;
    }
    return false;
}

document.addEventListener("DOMContentLoaded", () => {
    charCounter.setCharCount();
    charCounter.updateDOM();
});

textAreaEl.addEventListener('input', ()=> {
    charCounter.setCharCount();
    charCounter.updateDOM();
    if (charCounter.isMax()) {
        charCounter.setTextAreaToMax();
    }
})
textAreaEl.addEventListener('beforeinput', (e) => {
    if (charCounter.isMax() && e.inputType === 'insertText') {
        e.preventDefault();
    }
});

