const formEl = document.querySelector('.request-demo-form'); 
const thankYouEl = document.querySelector('.request-demo-success');
const somethingWentWrongEl = document.querySelector('.request-demo-fail');
const closeReqDemModalElements = document.querySelectorAll('.close-request-demo-modal');
const loaderEl = document.querySelector('.loader-con');
const exitModalEl = document.querySelector('.exit-btn');

const productButtons = document.querySelectorAll('.product-button-con');
const productInfo = {
    productName: "",
}

formEl.addEventListener('submit', async (e)=> {
    e.preventDefault();

    const formData = new FormData(formEl);
    formData.set("name", `Request Demo for ${productInfo.productName}`);
    formData.set("message", `I would like to know more about the product ${productInfo.productName}.`);
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
            exitModalEl.classList.remove('hidden');
            formEl.classList.add('hidden');
            thankYouEl.classList.remove('hidden');
            loaderEl.classList.add('hidden');
        }
    } catch (err) {
        console.error(err);
        exitModalEl.classList.remove('hidden');
        formEl.classList.add('hidden');
        loaderEl.classList.add('hidden');
        somethingWentWrongEl.classList.remove('hidden');
    }
});

productButtons.forEach((con) => {
    const reqDemBtnEl = con.querySelector('.request-demo-button');
    reqDemBtnEl.addEventListener('click', ()=>{
        productInfo.productName = con.dataset.productname;
        toggleRequestDemoModal();
    })
});
closeReqDemModalElements.forEach((btn)=> {
    btn.addEventListener('click', resetRequestDemoModal);
});

function toggleRequestDemoModal() {
    document.querySelector('.request-demo-modal').classList.toggle('hidden');
}

function resetRequestDemoModal() {
    if (!exitModalEl.classList.contains('hidden')) exitModalEl.classList.add('hidden');
    if (!thankYouEl.classList.contains('hidden')) thankYouEl.classList.add('hidden');
    if (!somethingWentWrongEl.classList.contains('hidden')) somethingWentWrongEl.classList.add('hidden');
    formEl.classList.remove('hidden');
    console.log(formEl);
    toggleRequestDemoModal();
}
