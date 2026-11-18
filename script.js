/* =====================================
   ASAPH ENERGY SOLUTIONS
   SHOPPING CART AND PRODUCT FUNCTIONS
===================================== */

// Get saved cart
function getCart() {
    try {
        return JSON.parse(localStorage.getItem("asaphCart")) || [];
    } catch {
        return [];
    }
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
            price: price === null ? null : Number(price),
            image: image,
            quantity: 1
        });
    }

    saveCart(cart);

    updateCartCount();

    alert(name + " has been added to your cart!");
}

// Remove product
function removeFromCart(id) {

    const cart = getCart().filter(item => item.id !== id);

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
        (total, item) => total + item.quantity,
        0
    );

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

// Display cart
function displayCart() {

    const container = document.getElementById("cartItems");

    if (!container) return;

    const cart = getCart();

    if (cart.length === 0) {

        container.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Explore our solar products to get started.</p>
                <a href="products.html">Browse Products</a>
            </div>
        `;

        updateCartTotals(0, false);
        return;
    }

    let subtotal = 0;
    let hasUnpricedProducts = false;

    container.innerHTML = cart.map(item => {

        const itemTotal = item.price === null
            ? null
            : item.price * item.quantity;

        if (itemTotal === null) {
            hasUnpricedProducts = true;
        } else {
            subtotal += itemTotal;
        }

        return `
            <div class="cart-item">

                <h3>${escapeHTML(item.name)}</h3>

                <p>
                    Price:
                    ${item.price === null
                        ? "Contact for Price"
                        : "₦" + item.price.toLocaleString()}
                </p>

                <p>
                    Quantity:
                    <button onclick="changeQuantity('${item.id}', -1)">−</button>

                    ${item.quantity}

                    <button onclick="changeQuantity('${item.id}', 1)">+</button>
                </p>

                <p>
                    Subtotal:
                    ${itemTotal === null
                        ? "Price to be confirmed"
                        : "₦" + itemTotal.toLocaleString()}
                </p>

                <button onclick="removeFromCart('${item.id}')">
                    Remove
                </button>

            </div>
        `;

    }).join("");

    updateCartTotals(subtotal, hasUnpricedProducts);
}

// Update cart totals
function updateCartTotals(subtotal, hasUnpricedProducts) {

    const subtotalElement = document.getElementById("cartSubtotal");
    const totalElement = document.getElementById("cartTotal");

    const formattedSubtotal = "₦" + subtotal.toLocaleString();

    if (subtotalElement) {
        subtotalElement.textContent = hasUnpricedProducts
            ? "Some prices are pending"
            : formattedSubtotal;
    }

    if (totalElement) {
        totalElement.textContent = hasUnpricedProducts
            ? "Contact us for final total"
            : formattedSubtotal;
    }
}

// Escape product names before displaying them
function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);
}

// Filter products by category
function filterProducts(category) {

    const products = document.querySelectorAll(".shop-product-card");

    products.forEach(product => {

        const productCategory = product.dataset.category;

        product.style.display =
            category === "all" || productCategory === category
                ? ""
                : "none";

    });
}

// Search products
function searchProducts() {

    const searchInput = document.getElementById("productSearch");

    if (!searchInput) return;

    const searchTerm = searchInput.value.toLowerCase().trim();

    const products = document.querySelectorAll(".shop-product-card");

    products.forEach(product => {

        const productName = (
            product.dataset.name || product.textContent
        ).toLowerCase();

        product.style.display = productName.includes(searchTerm)
            ? ""
            : "none";

    });
}

// Initialize page functions
document.addEventListener("DOMContentLoaded", function () {

    displayCart();
    updateCartCount();

});
