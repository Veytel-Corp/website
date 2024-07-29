const productEngin = {
    products: [
        {
            name: "DERMA-AI",
            quickDescription: "Melanoma Assessment for Early Detection",
            market: "Dermatology",
            impact: "70% increase in detecting changed skin lesions, the most telling sign of Melanoma.",
            description: "Technical information describing use of metrics... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut."
        },
        {
            name: "PULSAR-AI",
            quickDescription: "A Thermometer for Chest X-ray Analysis",
            market: "Pulmonology",
            impact: "Harnessing innovation and creativity, we transform challenges into opportunities, driving sustainable growth and positive change.",
            description: "Our company thrives on harnessing innovation and creativity to transform challenges into opportunities. We are committed to driving sustainable growth and positive change, ensuring our solutions make a meaningful impact on both our clients and the broader community. Through our dedication and expertise, we empower success and foster lasting progress."
        },
        {
            name: "PHARMA-AI",
            quickDescription: "Thermometric Index for Illness Severity",
            market: "PHARMA-AI",
            impact: "We drive sustainable growth and positive change by transforming challenges into innovative opportunities.",
            description: "Our company specializes in turning challenges into innovative opportunities, driving sustainable growth and positive change. With a focus on creativity and expertise, we deliver impactful solutions that benefit our clients and the broader community, fostering lasting progress and success."
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
    const prevActiveElements = document.querySelectorAll('.underline-focus');
    const activeNavElements = document.querySelectorAll(`li[data-productname="${productEngin.activeProduct}"]`);
    const productGifEl = document.querySelector('.product-gif-con img');
    const focusClass = 'underline-focus';
    // Selected product is alreadt focused so return.
    activeNavElements.forEach((activeNavEl) => {
        if (activeNavEl.classList.contains(focusClass)) return;
    });
    

    // Update product nav
    prevActiveElements.forEach((prevActiveEl) => {
        prevActiveEl.classList.remove(focusClass);
    });
    
    activeNavElements.forEach((activeNavEl) => {
        activeNavEl.classList.add(focusClass);
    });
    

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
    // Hero Banner
    nameEl.innerText = activeProductInfo.name;
    quickDescriptionEl.innerText = activeProductInfo.quickDescription;
    // Main Product Description
    marketEl.innerText = activeProductInfo.market;
    impactEl.innerText = activeProductInfo.impact;
    descriptionEl.innerText = activeProductInfo.description;

    // Change product gif
    productGifEl.src = `./assets/gifs/products/${activeProductInfo.name}.gif`
}
productEngin.updateURL = () => {
    const url = new URL(window.location);
    url.searchParams.set('productname', productEngin.activeProduct);
    history.replaceState(null, '', url);
}

const heroNavs = document.querySelectorAll('.hero-nav');
heroNavs.forEach((heroNavEl) => {
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
});

window.addEventListener('DOMContentLoaded', ()=> {
    const productName = productEngin.getActiveProductFromURL();
    productEngin.setActiveProduct(productName);
    productEngin.updateDOM();
});

document.addEventListener('scroll', function() {
    const scrollingNavEl = document.querySelector('.scrolling-nav');
    const stationHeroNavEl = document.querySelector('.stationary-hero-nav');
    const fixedHeroNavEl = document.querySelector('.fixed-hero-nav'); 

    const scrollingNavRect = scrollingNavEl.getBoundingClientRect();
    const stationHeroNavRect = stationHeroNavEl.getBoundingClientRect();

    if (scrollingNavRect.bottom >= stationHeroNavRect.top) {
        fixedHeroNavEl.classList.remove('hidden');
    } else {
        fixedHeroNavEl.classList.add('hidden');
    }
    // console.log('bottom: ', fixedElementRect.bottom)
    // console.log('top: ', targetElementRect.top)
});
