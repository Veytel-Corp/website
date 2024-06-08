(function loadHeaderStyles(filePath = './css/header.css') {
    const headEl = document.querySelector('head');
    let headElInnerHTML = headEl.innerHTML;
    headElInnerHTML += `<link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap" rel="stylesheet"> <link rel="stylesheet" href="./css/header.css" />`;
    headEl.innerHTML = headElInnerHTML;
})();

(function loadHeader(filePath = './html/header.html') {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Something went wrong when attempting to get the header content. Check file path. ${response.statusText}`);
            }
            return response.text()
        })
        .then(data => {
            document.querySelector('header').innerHTML = data;
    })
    .catch(error => {
        console.error(`Something went wrong when fetching the header content: `, error);
    })
})();