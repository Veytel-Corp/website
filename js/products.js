const productEngin = {
    products: [
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
    ],
    activeProduct: "DERMA-AI",
}
productEngin.getActiveProductFromURL = () => {
    const urlParamsString = window.location.search; 
    const urlParams = new URLSearchParams(urlParamsString);
    const activeProductName = urlParams.get('productname');
    return activeProductName;
}
productEngin.setActiveProduct = (product) => {
    productEngin.activeProduct = product;
}
productEngin.getActiveProductInfo = () => {
    const productInfo = productEngin.products.filter((product) => {
        return product.name === productEngin.activeProduct;
    })[0];
    return productInfo;
}
productEngin.updateDOM = () => {
    const prevActiveEl = document.querySelector('.underline-focus');
    const activeNavEl = document.querySelector(`li[data-productname="${productEngin.activeProduct}"]`);
    const focusClass = 'underline-focus';
    // Selected product is alreadt focused so return.
    if (activeNavEl.classList.contains(focusClass)) return;

    // Update product nav
    prevActiveEl.classList.remove(focusClass);
    activeNavEl.classList.add(focusClass);

    // Get active product info
    const activeProductInfo = productEngin.getActiveProductInfo(); 

    // Elements to be updated
    // Hero Banner
    const heroBannerEl = document.querySelector('.hero-banner');
    const nameEl = heroBannerEl.querySelector('h1');
    const quickDescriptionEl = heroBannerEl.querySelector('h2');
    // Main Product Description
    const productsMainEl = document.getElementById('products-main');
    const marketEl = productsMainEl.querySelector('#market-con').querySelector('p');
    const impactEl = productsMainEl.querySelector('#impact-con').querySelector('p');
    const descriptionEl = productsMainEl.querySelector('#description-con').querySelector('p');

    // Update element content
    //Hero Banner
    nameEl.innerText = activeProductInfo.name;
    quickDescriptionEl.innerText = activeProductInfo.quickDescription;
    // Main Product Description
    marketEl.innerText = activeProductInfo.market;
    impactEl.innerText = activeProductInfo.impact;
    descriptionEl.innerText = activeProductInfo.description;
}
productEngin.updateURL = () => {
    const url = new URL(window.location);
    url.searchParams.set('productname', productEngin.activeProduct);
    history.replaceState(null, '', url);
}

const heroNavEl = document.getElementById('hero-nav');
Array.from(heroNavEl.childNodes).forEach((li) => {
    li.addEventListener('click', (e) => {
        const element = e.target;
        const productName = element.dataset.productname;
        console.log(productName);
        productEngin.setActiveProduct(productName);
        productEngin.updateDOM();
        productEngin.updateURL();
    });
});

window.addEventListener('DOMContentLoaded', ()=> {
    const productName = productEngin.getActiveProductFromURL();
    productEngin.setActiveProduct(productName);
    productEngin.updateDOM();
})

