const productsContainer = document.querySelector("#products");

function loadProducts() {
    fetch("https://61e40755fbee6800175eb189.mockapi.io/products/phones").
        then(response => response.json()).
        then(products => {     
            products.forEach((product) => renderProduct(product))
        }).
        catch(error => console.error(error));
}

document.
    querySelector("#get-list-button").
    addEventListener("click", loadProducts);

document.
    querySelector("#empty-list-button").
    addEventListener("click", () => productsContainer.innerHTML = "");

function renderProduct(product) {
    const { productName, productImage, productPrice, productStockStatus, productRating } = product;

    ratingStars = getRating(productRating);
    stockStatus = getStockStatus(productStockStatus);
    stockClass = getStockClass(productStockStatus);

    productsContainer.innerHTML += `        
        <div class="product card col-12 col-sm-6 col-lg-3" style="width: 18rem;">
                <img class="card-img-top" src="${productImage}" alt="Card image cap">
                <div class="card-body d-flex flex-column justify-content-between">
                <div class="card-title-rating row">    
                    <h4 class="card-title col-12">${productName}</h4>
                    <p class="stars-rating col-12">${ratingStars}</p>
                </div>

                <div class="card-details row">
                    <h5 class="card-text col-12"><span class="price-text">Price: </span>${productPrice}</h5>                    
                    <a href="#" class="btn btn-primary col-6">See details</a>
                    <p class="stock-status ${stockClass} col-6">${stockStatus}</p>
                </div>
                </div>
            </div>
            `
}

function getRating(rating) {
    const starsNumber = Math.ceil(parseInt(rating.toString()[0]) / 2);
    let stars = "";
    for (let i = 0; i < starsNumber; i++) {
        stars += "*";
    }
    return stars;
}


function getStockStatus(status) {
    if (status === true) { return "In stock"};
    if (status === false) { return "Out of stock" };
}

function getStockClass(status) {
    if (status === true) { return "in-stock"};
    if (status === false) { return "out-of-stock" };
}