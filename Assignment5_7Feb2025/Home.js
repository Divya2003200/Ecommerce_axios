
// const getAllProducts=axios.get('https://fakestoreapi.com/products?limit=5').then(data=>console.log(data))
// .catch(err=>console.log(err))

// getAllProducts.then(data=>console.log(data)).catch(err=>console.log(err))
// console.log(getAllProducts)



// function showAllProducts() {
//     axios.get('https://fakestoreapi.com/products')
//         .then(response => {
//             const products = response.data;
//             const productContainer = document.getElementById("product-list");

//             productContainer.innerHTML = "";

//             products.forEach(product => {
//                 const productCard = document.createElement("div");
//                 productCard.classList.add("col-md-4", "product-card");

//                 productCard.innerHTML = `
//                     <div class="card">
//                         <img src="${product.image}" class="card-img-top" alt="${product.title}">
//                         <div class="card-body">
//                             <h5 class="card-title">${product.title}</h5>
//                             <p class="card-text">$${product.price}</p>
//                             <p class="card-text">Rating :${product.rating.rate}</p>
                            
//                             <button class="btn btn-primary add-to-cart">Add to Cart</button>
//                         </div>
//                     </div>
//                 `;
//             productContainer.appendChild(productCard);
//             });
//         })
//         .catch(error => console.error("Error fetching products:", error));
// }
// showAllProducts();

// function addToCart(product) {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     cart.push(product);
//     localStorage.setItem("cart", JSON.stringify(cart));
//     alert("Product added to cart!");
// }

// // Use event delegation to handle dynamically added buttons
// document.addEventListener("click", function (event) {
//     if (event.target.classList.contains("add-to-cart")) {
//         const productCard = event.target.closest(".card");
//         const product = {
//             id: event.target.getAttribute("data-id"),
//             title: productCard.querySelector(".card-title").innerText,
//             price: productCard.querySelector(".card-text").innerText.replace("$", ""),
//             image: productCard.querySelector(".card-img-top").src
//         };
//         addToCart(product);
//     }
// });




document.addEventListener("DOMContentLoaded", () => {
    showAllProducts();
});

// Function to fetch products from the API
function fetchProductsFromAPI() {
    return axios.get('https://fakestoreapi.com/products?limit=10')
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching products:", error);
            return [];
        });
}

// Function to fetch products from local storage
function fetchProductsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("products")) || [];
}

// Function to display products
function showAllProducts() {
    const productContainer = document.getElementById("product-list");
    productContainer.innerHTML = "";

    // Fetch API and local storage products
    Promise.all([fetchProductsFromAPI(), fetchProductsFromLocalStorage()])
        .then(([apiProducts, localProducts]) => {
            const allProducts = [...localProducts, ...apiProducts];

            allProducts.forEach(product => {
                const productCard = document.createElement("div");
                productCard.classList.add("col-md-4", "product-card");

                productCard.innerHTML = `
                    <div class="card">
                        <img src="${product.image}" class="card-img-top" alt="${product.title}">
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">$${product.price}</p>
                            <p class="card-text">Rating: ${product.rating?.rate || 'N/A'}</p>
                            <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                        </div>
                    </div>
                `;

                productContainer.appendChild(productCard);
            });
        })
        .catch(error => console.error("Error displaying products:", error));
}
