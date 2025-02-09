
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Ensure ID is stored as a number
    product.id = Number(product.id);

    // Check if product already exists in cart
    const existingProduct = cart.find(item => item.id === product.id);
    if (!existingProduct) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added to cart!");
        window.location.reload(); // Ensure the cart updates on page reload
    } else {
        alert("Product is already in the cart!");
    }
}


document.addEventListener("click", function (event) {
    if (event.target.classList.contains("add-to-cart")) {
        const productCard = event.target.closest(".card");
        const product = {
            id: Number(event.target.getAttribute("data-id")), // Ensure ID is a number
            title: productCard.querySelector(".card-title").innerText,
            price: productCard.querySelector(".card-text").innerText.replace("$", ""),
            image: productCard.querySelector(".card-img-top").src
        };
        addToCart(product);
    }
});


function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    product.id = Number(product.id); // Ensure ID is stored as a number

    if (!cart.some(item => item.id === product.id)) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added to cart!");
    } 
}

document.addEventListener("click", event => {
    if (event.target.classList.contains("add-to-cart")) {
        const productCard = event.target.closest(".card");
        addToCart({
            id: Number(event.target.getAttribute("data-id")),
            title: productCard.querySelector(".card-title").innerText,
            price: productCard.querySelector(".card-text").innerText.replace("$", ""),
            image: productCard.querySelector(".card-img-top").src
        });
    }
});
