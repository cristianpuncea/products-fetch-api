const productsContainer = document.querySelector("#products");
const productDetails = document.querySelector(".modal-content");
const productsURL = "https://61e40755fbee6800175eb189.mockapi.io/products/phones";

// Using callback function to fetch data repeatedly in the code
function getData(url, callbackResult) {
    fetch(url).
        then(response => response.json()).
        then(result => callbackResult(result)).
        then(() => getProductDetails()).
        catch(error => console.error(error));
}

function loadProducts() {
    getData(productsURL, products => renderProductList(products));
}

function clearProductList() {
    productsContainer.innerHTML = "";
}

function sortAscendingPrice(products) {
    const productsDivList = document.querySelectorAll(".product"); 
    const productsArray = Array.from(productsDivList); 
 
    productsArray.sort((product1, product2) => {        
        const price1 = parseFloat(product1.querySelector(".price-value").innerText);
        const price2 = parseFloat(product2.querySelector(".price-value").innerText);
        return price1 - price2;
    });

    productsArray.forEach(product => productsContainer.appendChild(product));
}

function sortDescendingPrice() {
    const productsDivList = document.querySelectorAll(".product"); 
    const productsArray = Array.from(productsDivList); 
 
    productsArray.sort((product1, product2) => {        
        const price1 = parseFloat(product1.querySelector(".price-value").innerText);
        const price2 = parseFloat(product2.querySelector(".price-value").innerText);
        return price2 - price1;
    });

    productsArray.forEach(product => productsContainer.appendChild(product));
}

function renderProductList(products) {
    products.forEach((product) => {
        renderProduct(product);
    });
}

// Render each product in the list after data is fetched
function renderProduct(product) {
    const { productName, productImage, productPrice, productStockStatus, productRating, productId } = product;

    const ratingStars = getRating(productRating);
    const stockStatus = getStockStatus(productStockStatus);
    const stockClass = getStockClass(productStockStatus);

    if (!productsContainer.innerHTML.includes(`id="prodID-${productId}"`)) {

        productsContainer.innerHTML += `        
            <div class="product card col-12 col-sm-6 col-lg-3" style="width: 18rem;">
                <img class="card-img-top" src="${productImage}" alt="Card image cap">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div class="card-title-rating row">    
                        <h4 class="card-title col-12">${productName}</h4>
                        <p class="stars-rating col-12">${ratingStars}</p>
                    </div>

                    <div class="card-details row">
                        <h5 class="card-text col-12"><span class="price-text">Price: </span><span class="price-value">${productPrice}</span>$</h5>                    
                        <a href="#" class="btn btn-primary col-6 see-details-button" data-bs-toggle="modal" id="prodID-${productId}" data-bs-target="#exampleModal">See details</a>
                        <p class="stock-status ${stockClass} col-6">${stockStatus}</p>
                    </div>
                </div>
            </div>
            
            <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">                
            </div>            
        </div>
            `
    }
}

// Create rating stars from the fetched productRating number
function getRating(rating) {
    const starsNumber = Math.ceil(parseInt(rating.toString()[0]) / 2);
    let stars = "";
    for (let i = 0; i < starsNumber; i++) {
        stars += "*";
    }
    return stars;
}

function getStockStatus(status) {
    if (status === true) { return "In stock" };
    if (status === false) { return "Out of stock" };
}

function getStockClass(status) {
    if (status === true) { return "in-stock" };
    if (status === false) { return "out-of-stock" };
}

function getProductDetails() {
    const seeDetailsButtons = document.querySelectorAll(".see-details-button");
    seeDetailsButtons.forEach(button => button.addEventListener("click", event => updateModal(event.target.id)));
}

// Recove id for the product and fetch its data
function updateModal(prodID) {   
    const id = prodID.split("-")[1];
    const singleProductURL = `${productsURL}/${id}`;
    getData(singleProductURL, product => renderModalDescription(product));
}

// After fetching data, update product details in modal
function renderModalDescription(product) {
    const { productName, productDescription, productImage, productPrice, productRating} = product;

    const ratingStars = getRating(productRating);

    document.querySelector("#exampleModal .modal-dialog").innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">${productName}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <img src="${productImage}" alt="product image" class="modal-img "/>
                    <p>${productDescription}</p>
                    <div class="price-rating">
                        <h6><span class="price-text">Price: </span>${productPrice}$</h6>
                        <span class="stars-rating">${ratingStars}</span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary"><i class="bi bi-cart-plus"></i> Add to Cart</button>
                </div>
            </div>
    `
}


document.
    querySelector("#get-list-button").
    addEventListener("click", loadProducts);

document.
    querySelector("#empty-list-button").
    addEventListener("click", clearProductList);

document.
    querySelector("#sort-asc-button").
    addEventListener("click", () => {
        if (productsContainer.innerHTML === "") {
            alert("Please get the product list first!");
            return
        }
        sortAscendingPrice();
    });

// document.querySelector("#sort-asc-button").addEventListener("click", sortAscendingPrice);

document.
    querySelector("#sort-desc-button").
    addEventListener("click", () => {
        if (productsContainer.innerHTML === "") {
            alert("Please get the product list first!");
            return
        }
        sortDescendingPrice();
    });

