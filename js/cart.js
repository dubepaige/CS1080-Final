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

document.addEventListener("DOMContentLoaded", () => {
  const clearCartButton = document.getElementById("clear-cart");
  if (clearCartButton) {
    clearCartButton.addEventListener("click", () => {
      clearCart();
    });
  } else {
    console.error("Clear Cart button not found!");
  }
})
// Handle form submission
function SubForm() {
  // Count occurrences of Product 1
  const product1Count = cartItems.filter((item) => item.name === "Product 1").length;
  // Update the hidden input with Product 1 count
  document.getElementById("p1").value = product1Count;
  
  // Count occurrences of Product 2
  const product2Count = cartItems.filter((item) => item.name === "Product 2").length;
  // Update the hidden input with Product 2 count
  document.getElementById("p2").value = product2Count;
  
  // Count occurrences of Product 3
  const product3Count = cartItems.filter((item) => item.name === "Product 3").length;
  // Update the hidden input with Product 3 count
  document.getElementById("p3").value = product3Count;
  
  // Count occurrences of Product 4
  const product4Count = cartItems.filter((item) => item.name === "Product 4").length;
  // Update the hidden input with Product 4 count
  document.getElementById("p4").value = product4Count;
  
  // Count occurrences of Product 5
  const product5Count = cartItems.filter((item) => item.name === "Product 5").length;
  // Update the hidden input with Product 5 count
  document.getElementById("p5").value = product5Count;
  
  
  if (product1Count + product2Count + product3Count + product4Count + product5Count === 0) {
    alert("Cart is empty!");
    return;
  }

  // Serialize form data and send to API
  const formData = $("#myForm").serialize();

  $.ajax({
    url: "https://api.apispreadsheets.com/data/eUE0Ih3L4rHhGm6J/",
    type: "post",
    data: formData,
    success: function () {
      document.getElementById('shop-name').value = '';
      document.getElementById('shop-email').value = '';
      document.getElementById('shop-number').value = '';
      document.getElementById('shop-address').value = '';
      document.getElementById('shop-city').value = '';
      document.getElementById('shop-state').value = '';
      document.getElementById('shop-zip').value = '';
      document.getElementById('shop-card').value = '';
      document.getElementById('shop-expiry').value = '';
      document.getElementById('shop-cvv').value = '';
      alert("Checkout data successfully submitted.");
      clearCart();
    },
    error: function () {
      alert("There was an error submitting the data.");
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const checkoutButton = document.getElementById("checkout-button");
  const checkoutForm = document.getElementById("myForm");
  const submitBtn = document.getElementById("submitBtn");
  const cartWrapper = document.getElementById("cart-and-checkout-wrapper");

  if (checkoutButton && checkoutForm) {
    checkoutButton.addEventListener("click", () => {
      checkoutForm.classList.toggle("hidden");
      submitBtn.classList.toggle("hidden");

    });
  } else {
    console.error("Checkout button or form not found!");
  }
});

