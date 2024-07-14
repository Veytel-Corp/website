const products = [
    {
        name: "DERMA-AI",
        quickDescription: "Melanoma Assessment for Early Detection",
        market: "Dermatology",
        impact: "70% increase in detecting changed skin lesions, the most telling sign of Melanoma",
        description: "Technical information describing use of metrics... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut"
    },
    {
        name: "PULSAR-AI",
        quickDescription: "PULSAR-AI",
        market: "PULSAR-AI",
        impact: "PULSAR-AI",
        description: "PULSAR-AI"
    },
    {
        name: "PHARMA-AI",
        quickDescription: "PHARMA-AI",
        market: "PHARMA-AI",
        impact: "PHARMA-AI",
        description: "PHARMA-AI"
    },
];

const heroNavEl = document.getElementById('hero-nav');
Array.from(heroNavEl.childNodes).forEach((element) => {
    element.addEventListener('click', setActive);
});

function setActive(e) {
    const element = e.target;
    if (element.classList.contains('underline-focus')) return;

    const prevActiveEl = document.querySelector('.underline-focus');
    console.log(prevActiveEl);
    prevActiveEl.classList.remove('underline-focus');

    element.classList.add('underline-focus')

    const productName = element.dataset.productname;

    const productInfo = products.filter((product) => {
        return product.name === productName;
    })[0];

    console.log(productInfo);


    const heroBannerEl = document.querySelector('.hero-banner');
    const productsMainEl = document.getElementById('products-main');

    const nameEl = heroBannerEl.querySelector('h1');
    const quickDescriptionEl = heroBannerEl.querySelector('h2');

    nameEl.innerText = productInfo.name;
    quickDescriptionEl.innerText = productInfo.quickDescription;

    
    const marketEl = productsMainEl.querySelector('#market-con').querySelector('p');
    const impactEl = productsMainEl.querySelector('#impact-con').querySelector('p');
    const descriptionEl = productsMainEl.querySelector('#description-con').querySelector('p');

    marketEl.innerText = productInfo.market;
    impactEl.innerText = productInfo.impact;
    descriptionEl.innerText = productInfo.description;


}

