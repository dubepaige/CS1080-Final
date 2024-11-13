// cart.js

const cartItems = [];

function addToCart(productName) {
  cartItems.push(productName);
  renderCart();
}

function renderCart() {
  const cartItemsList = document.getElementById("cart-items");
  cartItemsList.innerHTML = ""; // Clear the current cart list

  cartItems.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    cartItemsList.appendChild(li);
  });
}

document.getElementById("checkout-button").addEventListener("click", () => {
  alert("Proceeding to checkout...");
});
