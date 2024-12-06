let cartItems = [];
let totalPrice = 0;

// Add an item to the cart
function addToCart(productName, productPrice) {
  cartItems.push({ name: productName, price: productPrice });
  totalPrice += productPrice;
  renderCart();
}

// Render the cart
function renderCart() {
  const cartItemsList = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  cartItemsList.innerHTML = "";

  cartItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = () => removeFromCart(index);
    li.appendChild(removeButton);
    cartItemsList.appendChild(li);
  });

  totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Remove an item from the cart
function removeFromCart(index) {
  totalPrice -= cartItems[index].price;
  cartItems.splice(index, 1);
  renderCart();
}

// Clear the cart
function clearCart() {
  cartItems.length = 0;
  totalPrice = 0;
  renderCart();
}

// Handle form submission
function SubForm() {
  // Count occurrences of Product 1
  const product1Count = cartItems.filter((item) => item.name === "Product 1").length;

  // Update the hidden input with Product 1 count
  document.getElementById("cartItems").value = product1Count;

  // If no Product 1 in the cart, alert the user
  if (product1Count === 0) {
    alert("Product 1 is not in the cart.");
    return;
  }

  // Serialize form data and send to API
  const formData = $("#myForm").serialize();

  $.ajax({
    url: "https://api.apispreadsheets.com/data/EXNV8spKAX6jqib8/",
    type: "post",
    data: formData,
    success: function () {
      alert("Checkout data successfully submitted.");
      clearCart();
    },
    error: function () {
      alert("There was an error submitting the data.");
    },
  });
}

// Initialize event listeners
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("clear-cart").addEventListener("click", clearCart);
});
