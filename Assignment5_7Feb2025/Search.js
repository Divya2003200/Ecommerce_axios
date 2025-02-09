 

// const SearchBtn=document.getElementById('searchbtn')
// SearchBtn.addEventListener('click',()=>{
// const Search=document.getElementById('search')
// console.log(Search.value)
// })

document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById('searchbtn'); 
    const searchInput = document.getElementById('search');  

    const searchKey=searchBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        console.log("Search Value:", searchInput.value); 

        try {
            const data = await DisplayFilteredProducts(fetchAndFilterProducts,searchInput.value);
            console.log(data);
        } catch (err) {
            alert(err);
        }
    });
    
});


async function fetchAndFilterProducts(searchValue) {
    try {
        
        const response = await axios.get('https://fakestoreapi.com/products'); 
        const products = response.data;

        const filteredProducts = products.filter(product =>
             product.title.toLowerCase().includes(searchValue.toLowerCase())
            //  ||
            // product.description.toLowerCase().includes(searchValue.toLowerCase())
        );

        console.log("Filtered Products:", filteredProducts); 
        return filteredProducts;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

async function DisplayFilteredProducts(callback, searchValue) {
    const products = await callback(searchValue);
    const productList = document.getElementById('product-list');
    productList.innerHTML = ""; // Clear previous results

    if (products.length === 0) {
        productList.innerHTML = "<h4 class='text-center'>No products found</h4>";
        return;
    }

    products.forEach(product => {
        // Create a div element
        const productCard = document.createElement("div");
        productCard.classList.add("col-md-4", "mb-3"); // Bootstrap classes

        // Set innerHTML of created element
        productCard.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text"><strong>Price: $${product.price}</strong></p>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;

        productList.append(productCard); // Append the element
    });
  
    
    // Function to update total price in the UI
    let totalPrice = 0; // Declare totalPrice globally

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("add-to-cart")) {
        const productPrice = parseFloat(
            event.target.closest(".card").querySelector(".card-text strong").textContent.replace("Price: $", "")
        );

        updateTotalPrice(productPrice);
    }
});

// Function to update total price in the UI
function updateTotalPrice(price) {
    totalPrice += price;
    document.getElementById("total-price").innerHTML = `<h4>Total Price: $${totalPrice.toFixed(2)}</h4>`;
}

    
}

