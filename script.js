/* ==================================
   ASAPH ENERGY SOLUTIONS
   MAIN JAVASCRIPT FILE
================================== */

// Wait until the page has loaded
document.addEventListener("DOMContentLoaded", function () {

    console.log("Asaph Energy Solutions loaded successfully.");

    // Identify the current page
    const currentPage = window.location.pathname;

    // Homepage
    if (currentPage.endsWith("index.html") || currentPage.endsWith("/")) {
        console.log("Homepage loaded.");
    }

    // Products page
    if (currentPage.endsWith("products.html")) {
        console.log("Products page loaded.");
    }

    // Cart page
    if (currentPage.endsWith("cart.html")) {
        console.log("Cart page loaded.");
    }

    // Login page
    if (currentPage.endsWith("login.html")) {
        console.log("Login page loaded.");
    }

});
