(function loadHeader(filePath = './html/header.html') {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Something went wrong when attempting to get the header content. Check file path. ${response.statusText}`);
            }
            return response.text()
        })
        .then(data => {
            document.querySelector("header").innerHTML = data;
    })
    .catch(error => {
        console.error(`Something went wrong when fetching the header content: `, error);
    })
})();