
document.addEventListener("DOMContentLoaded", showCartItems);

function showCartItems() {
    const cartContainer = document.getElementById("cart-container");
    const checkoutBtn = document.getElementById("checkout-btn");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p class='text-center'>Your cart is empty</p>";
        checkoutBtn.style.display = "none";
        return;
    }

    checkoutBtn.style.display = "block";
    let totalPrice = cart.reduce((sum, product) => sum + parseFloat(product.price), 0);

    cartContainer.innerHTML = cart.map(product => `
        <div class="cart-item col-md-4 mb-3">
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">$${product.price}</p>
                    <button class="btn btn-danger remove-from-cart" data-id="${product.id}">Remove</button>
                </div>
            </div>
        </div>
    `).join("");

    cartContainer.innerHTML += `<div class="text-center mt-3"><h4>Total Price: $${totalPrice.toFixed(2)}</h4></div>`;
}



document.addEventListener("click", async function (event) {
    if (event.target.classList.contains("remove-from-cart")) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const productId = Number(event.target.dataset.id);

        if (productId <= 20) {
           
            try {
                await axios.delete(`https://fakestoreapi.com/products/${productId}`);
                console.log(`Product ${productId} deleted from API.`);
            } catch (error) {
                console.error("Error deleting product from API:", error);
            }
        } 

       
        cart = cart.filter(item => item.id !== productId);
        console.log(`Product ${productId} deleted from local.`);
        localStorage.setItem("cart", JSON.stringify(cart));

        showCartItems(); 
    }
});



document.getElementById("checkout-btn").addEventListener("click", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) return;

    let totalPrice = cart.reduce((sum, product) => sum + parseFloat(product.price), 0);
    
    if (confirm(`Your total is $${totalPrice.toFixed(2)}. Do you want to proceed with checkout?`)) {
        localStorage.removeItem("cart");
        showCartItems();
        alert("Checkout successful!");
    }
});
