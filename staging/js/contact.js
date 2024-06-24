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
            loaderEl.classList.remove('hidden')
            const response = await fetch('https://script.google.com/macros/s/AKfycbwFSVmOtZnXbUSUDZQoGFL8AaEDSaB1vZjdQDlMsLVux7kHRXhg64M7XQHbJpPNv2hXIw/exec', {
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
            // errorEl.classList.remove('hidden');
        }
});