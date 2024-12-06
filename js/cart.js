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
  updateFormCheckboxes();
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

// Update the form with checkboxes for cart items
function updateFormCheckboxes() {
  const checkboxContainer = document.getElementById("cartItemsCheckboxes");
  checkboxContainer.innerHTML = "";

  cartItems.forEach((item, index) => {
    const label = document.createElement("label");
    label.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "selectedItems";
    checkbox.value = JSON.stringify(item); // Store the item data as a JSON string
    label.prepend(checkbox);
    const br = document.createElement("br");
    checkboxContainer.appendChild(label);
    checkboxContainer.appendChild(br);
  });
}

// Handle form submission
function SubForm() {
  const selectedCheckboxes = document.querySelectorAll("input[name='selectedItems']:checked");
  const selectedItems = Array.from(selectedCheckboxes).map((checkbox) => JSON.parse(checkbox.value));

  if (selectedItems.length === 0) {
    alert("Please select at least one item to purchase.");
    return;
  }

  const cartDataInput = document.getElementById("cartData");
  cartDataInput.value = JSON.stringify(selectedItems);

  $.ajax({
    url: "https://api.apispreadsheets.com/data/EXNV8spKAX6jqib8/",
    type: "post",
    data: $("#myForm").serializeArray(),
    success: function () {
      alert("Form Data Submitted :)");
      clearCart();
    },
    error: function () {
      alert("There was an error :(");
    },
  });
}

// Initialize event listeners
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("checkout-button").addEventListener("click", () => {
    document.getElementById("myForm").style.display = "block";
  });
  document.getElementById("clear-cart").addEventListener("click", clearCart);
  document.getElementById("myForm").addEventListener("submit", (event) => {
    event.preventDefault();
    SubForm();
  });
});
