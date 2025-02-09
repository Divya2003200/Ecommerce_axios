document.addEventListener("DOMContentLoaded", () => {
    showAllProducts();
});


function fetchProductsFromAPI() {
    return axios.get('https://fakestoreapi.com/products?limit=10')
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching products:", error);
            return [];
        });
}


function fetchProductsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("products")) || [];
}


function showAllProducts() {
    const productContainer = document.getElementById("product-list");
    productContainer.innerHTML = "";


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
