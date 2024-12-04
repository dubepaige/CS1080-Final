// cart.js

const cartItems = [];

// Add item to the cart
function addToCart(productName) {
  cartItems.push(productName);
  renderCart();
}

// Render the cart
function renderCart() {
  const cartItemsList = document.getElementById("cart-items");
  cartItemsList.innerHTML = ""; // Clear the current cart list
  let total = 0;

  cartItems.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    cartItemsList.appendChild(li);
    total += getPrice(item); // Calculate total price
  });

  document.getElementById("cart-total").textContent = `Total: $${total.toFixed(2)}`;
}

// Mock function to get product price (replace with real logic as needed)
function getPrice(productName) {
  const prices = {
    "Product 1": 10.99,
    "Product 2": 15.99
  };
  return prices[productName] || 0;
}

// Show the checkout form
function showCheckoutForm() {
  const cartItems = document.getElementById("cart-items").children;
  if (cartItems.length === 0) {
    alert("Your cart is empty.");
    return;
  }
  document.getElementById("checkout-form").style.display = "block";
}

// Cancel the checkout process
function cancelCheckout() {
  document.getElementById("checkout-form").style.display = "none";
}

// Handle form submission
document.getElementById("checkout").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    address: formData.get("address"),
    card: formData.get("card"),
    expiry: formData.get("expiry"),
    cvv: formData.get("cvv"),
  };

  // Replace with API integration
  console.log("Checkout Data:", data);
  alert("Thank you for your purchase!");

  // Reset the form and cart
  e.target.reset();
  document.getElementById("checkout-form").style.display = "none";
  document.getElementById("cart-items").innerHTML = "";
  document.getElementById("cart-total").textContent = "Total: $0.00";
});
