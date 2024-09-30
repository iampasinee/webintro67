// Select all "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.cart-btn button');

// Initialize an empty cart array
let cart = [];

// Select the offcanvas body where the cart items will be displayed
const cartBody = document.getElementById('cart-items');

// Select the total element
const totalElement = document.querySelector('.total');

// Function to update the cart display in the offcanvas
function updateCartDisplay() {
    // Clear the current cart display
    cartBody.innerHTML = '';

    // Variable to keep track of the total price
    let totalPrice = 0;

    // Loop through each product in the cart
    cart.forEach(product => {
        // Calculate total price for the current product
        const productTotalPrice = product.price * product.quantity;
        totalPrice += productTotalPrice; // Add to total price

        // Create a new HTML block for each product
        const cartItem = `
            <div class="list-item row p-2 border border-1 rounded-2 mb-2">
                <div class="col-4 col-md-3 product-img d-flex align-items-center justify-content-center">
                    <img src="${product.image}" class="img-fluid rounded">
                </div>
                <div class="col-8 col-md-9 justify-content-center">
                    <div class="product-name text-center">
                        <h4><a href="#">${product.name}</a></h4>
                    </div>
                    <div class="product-price text-center m-0">
                        <data class="card-price" value="${product.price}">฿${productTotalPrice.toLocaleString()}</data>
                    </div>
                    <div class="row product-quantity justify-content-center mt-2">
                        <div class="col-2 col-md-1 minus text-center" onclick="updateQuantity('${product.id}', -1)"><i class="bi bi-dash"></i></div>
                        <div class="col-4 col-md-2 amount text-center" id="quantity-${product.id}">${product.quantity}</div>
                        <div class="col-2 col-md-1 plus text-center" onclick="updateQuantity('${product.id}', 1)"><i class="bi bi-plus"></i></div>
                    </div>
                </div>
            </div>
        `;

        // Add the new item to the cart display
        cartBody.insertAdjacentHTML('beforeend', cartItem);
    });

    // Update the total price display
    totalElement.innerText = `Total: ฿${totalPrice.toLocaleString()}`;
}

// Function to update the quantity of a product
function updateQuantity(productId, change) {
    // Find the product in the cart
    const productIndex = cart.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
        // Update quantity
        cart[productIndex].quantity += change;

        // Check if quantity is less than 1
        if (cart[productIndex].quantity < 1) {
            // Remove from cart if quantity is 0
            removeFromCart(productId);
        } else {
            // Update the display of quantity
            document.getElementById(`quantity-${productId}`).innerText = cart[productIndex].quantity;

            // Update the cart display
            updateCartDisplay();
        }
    }
}

// Function to add product to cart
function addToCart(event) {
    const productBox = event.target.closest('.product-box');
    
    // Extract product details
    const productId = productBox.getAttribute('data-id'); // Get the data-id attribute
    const productName = productBox.querySelector('.product-name a').innerText;
    const productPrice = parseFloat(productBox.querySelector('.card-price').getAttribute('value'));
    const productImage = productBox.querySelector('.box-img img').src;

    // Check if product already in cart
    const existingProductIndex = cart.findIndex(product => product.id === productId);
    if (existingProductIndex !== -1) {
        // If product exists, just increase the quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // If not, create a new product object
        const product = {
            id: productId, // Use the unique identifier for the product
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1 // Initialize quantity to 1
        };
        cart.push(product);
    }

    // Update the cart display in the offcanvas
    updateCartDisplay();
}

// Function to remove product from cart
function removeFromCart(productId) {
    // Find the index of the product in the cart
    const productIndex = cart.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
        // Remove the product from the cart
        cart.splice(productIndex, 1);
        
        // Update the cart display
        updateCartDisplay();
    }
}


// Add event listener to each button
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});
