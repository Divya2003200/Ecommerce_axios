document.addEventListener("DOMContentLoaded", () => fetchProducts());

// Fetch products (from API or localStorage)
const fetchProducts = async () => {
    let products = JSON.parse(localStorage.getItem("products"));

    if (!products || products.length === 0) {
        try {
            const { data } = await axios.get("https://fakestoreapi.com/products");
            localStorage.setItem("products", JSON.stringify(data));
            products = data;
        } catch (error) {
            return console.error("Error fetching products:", error);
        }
    }

    displayProducts(products);
};

// Display products
const displayProducts = (products) => {
    const productContainer = document.getElementById("products-container");
    productContainer.innerHTML = "";

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("col-md-4", "mb-3");

        productCard.innerHTML = `
            <div class="card shadow-sm p-3">
                <img src="${product.image}" class="card-img-top" alt="${product.title}" style="height: 150px; object-fit: contain;">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text text-success fw-bold">Price: $${product.price}</p>
                   <p class="card-text">Rating: ${product.rating ? product.rating.rate : 'N/A'}</p>

                    <button class="btn btn-warning update-btn" data-id="${product.id}">Update</button>
                    <button class="btn btn-danger delete-btn" data-id="${product.id}">Delete</button>
                </div>
            </div>
        `;

        productContainer.append(productCard);
    });
};

// Add Product
document.getElementById("add-product-form").addEventListener("submit", (e) => {
    e.preventDefault();

    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push({
        id: Date.now(),
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        image: document.getElementById("image").value,
        rating: {
            rate:document.getElementById("rating").value,
            count:0
        }
        
    });

    localStorage.setItem("products", JSON.stringify(products));
    alert("Product added!");
    displayProducts(products);
    e.target.reset()
});

// Delete & Update Product
document.addEventListener("click", (event) => {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    const productId = event.target.getAttribute("data-id");

    if (event.target.classList.contains("delete-btn")) {
        if (confirm("Delete this product?")) {
            localStorage.setItem("products", JSON.stringify(products.filter(p => p.id != productId)));
            displayProducts(JSON.parse(localStorage.getItem("products")));
        }
    } 

    if (event.target.classList.contains("update-btn")) {
        let product = products.find(p => p.id == productId);
        if (product) {
            product.title = prompt("New title:", product.title) || product.title;
            product.price = prompt("New price:", product.price) || product.price;
            localStorage.setItem("products", JSON.stringify(products));
            displayProducts(products);
        }
    }
});

// Logout
document.getElementById("logout-btn").addEventListener("click", () => {
    alert("Logging out...");
    window.location.href = "login.html";
});
