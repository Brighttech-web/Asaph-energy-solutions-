/* ==================================
   ASAPH ENERGY SOLUTIONS
   SHOPPING CART SYSTEM
================================== */

// Get cart from browser storage
function getCart() {
    return JSON.parse(localStorage.getItem("asaphCart")) || [];
}

// Save cart
function saveCart(cart) {
    localStorage.setItem("asaphCart", JSON.stringify(cart));
}

// Add product to cart
function addToCart(id, name, price, image = "") {

    const cart = getCart();

    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: Number(price),
            image: image,
            quantity: 1
        });
    }

    saveCart(cart);

    alert(name + " has been added to your cart!");

    updateCartCount();
}

// Remove product
function removeFromCart(id) {

    let cart = getCart();

    cart = cart.filter(item => item.id !== id);

    saveCart(cart);

    displayCart();
    updateCartCount();
}

// Change quantity
function changeQuantity(id, amount) {

    const cart = getCart();

    const product = cart.find(item => item.id === id);

    if (!product) return;

    product.quantity += amount;

    if (product.quantity <= 0) {
        removeFromCart(id);
        return;
    }

    saveCart(cart);

    displayCart();
    updateCartCount();
}

// Update cart count
function updateCartCount() {

    const cart = getCart();

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity, 0
    );

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

// Display cart
function displayCart() {

    const cartContainer = document.getElementById("cartItems");

    if (!cartContainer) return;

    const cart = getCart();

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <p>Your shopping cart is empty.</p>
            <a href="products.html">Browse Products</a>
        `;

        updateCartTotals(0);
        return;
    }

    let subtotal = 0;

    cartContainer.innerHTML = cart.map(item => {

        const itemTotal = item.price * item.quantity;

        subtotal += itemTotal;

        return `
            <div class="cart-item">
                <h3>${escapeHTML(item.name)}</h3>

                <p>Price: ₦${item.price.toLocaleString()}</p>

                <p>
                    Quantity:
                    <button onclick="changeQuantity('${item.id}', -1)">−</button>
                    ${item.quantity}
                    <button onclick="changeQuantity('${item.id}', 1)">+</button>
                </p>

                <p>Subtotal: ₦${itemTotal.toLocaleString()}</p>

                <button onclick="removeFromCart('${item.id}')">
                    Remove
                </button>
            </div>
        `;

    }).join("");

    updateCartTotals(subtotal);
}

// Update totals
function updateCartTotals(subtotal) {

    const subtotalElement = document.getElementById("cartSubtotal");
    const totalElement = document.getElementById("cartTotal");

    if (subtotalElement) {
        subtotalElement.textContent = "₦" + subtotal.toLocaleString();
    }

    if (totalElement) {
        totalElement.textContent = "₦" + subtotal.toLocaleString();
    }
}

// Safely display product names
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);
}

// Initialize cart when page loads
document.addEventListener("DOMContentLoaded", function () {
    displayCart();
    updateCartCount();
});
