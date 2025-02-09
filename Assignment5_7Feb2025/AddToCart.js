
// let cart = JSON.parse(localStorage.getItem("cart")) || [];

// // Function to display all cart items on the cart page
// function loadCart() {
//     const cartContainer = document.getElementById("cart-container");
//     cartContainer.innerHTML = ""; 

//     if (cart.length === 0) {
//         cartContainer.innerHTML = "<p>Your cart is empty.</p>";
//         return;
//     }

//     cart.forEach(product => {
//         console.log(product.category)
//         const productCard = document.createElement("div");
//         productCard.classList.add("col-md-4", "mb-3");

//         productCard.innerHTML = `
//             <div class="card">
//                 <img src="${product.image}" class="card-img-top" alt="${product.title}">
//                 <div class="card-body">
//                     <h5 class="card-title">${product.title}</h5>
//                     <p class="card-text"><strong>Price: $${product.price}</strong></p>
//                     <button class="btn btn-danger remove-btn" data-title="${product.title}">Remove</button>
//                 </div>
//             </div>
//         `;

//         cartContainer.appendChild(productCard);
//     });
// }


// function removeFromCart(title) {
//     cart = cart.filter(product => product.title !== title);
//     localStorage.setItem("cart", JSON.stringify(cart));
//     loadCart(); 
// }


// document.addEventListener("click", function (event) {
//     if (event.target.classList.contains("remove-btn")) {
//         const title = event.target.getAttribute("data-title");
//         removeFromCart(title);
//     }
// });


// const checkoutBtn=document.querySelector('#checkout-btn')
// checkoutBtn.addEventListener('click', function () {
//     let total = 0;
//     cart.forEach(product => total += parseFloat(product.price));

//     if (cart.length === 0) {
//         alert("Your cart is empty.");
//         return;
//     }

//     if (confirm(`Total Price: $${total.toFixed(2)}\nProceed to Checkout?`)) {
//         alert("Order placed successfully!");
//         cart = [];
//         localStorage.removeItem("cart");
//         loadCart();
//         checkoutBtn.remove()
//     }
// });

// document.addEventListener("DOMContentLoaded", loadCart);



// function addToCart(product) {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
//     // Check if product already exists in cart
//     const existingProduct = cart.find(item => item.id === product.id);
//     if (!existingProduct) {
//         cart.push(product);
//         localStorage.setItem("cart", JSON.stringify(cart));
//         alert("Product added to cart!");
//     } else {
//         alert("Product is already in the cart!");
//     }
// }

// // Event listener for "Add to Cart" button
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

// Event listener for "Add to Cart" button
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

// Event delegation for "Add to Cart" button
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
