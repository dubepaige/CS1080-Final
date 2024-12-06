let cartItems = [];
let totalPrice = 0;

function addToCart(productName, productPrice) {
  cartItems.push({ name: productName, price: productPrice });
  totalPrice += productPrice;
  renderCart();
  console.log(cartItems)
}

function renderCart() {
  const cartItemsList = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  cartItemsList.innerHTML = "";

  cartItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-item");
    removeButton.onclick = () => removeFromCart(index);
    li.appendChild(removeButton);
    cartItemsList.appendChild(li);
  });

  totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

function removeFromCart(index) {
  totalPrice -= cartItems[index].price;
  cartItems.splice(index, 1);
  renderCart();
}

function clearCart() {
  cartItems.length = 0;
  totalPrice = 0;
  renderCart();
}



function toggleCheckoutForm() {
  const checkoutFormContainer = document.getElementById("checkout-form-container");
  checkoutFormContainer.style.display =
    checkoutFormContainer.style.display === "none" ? "block" : "none";
}

document.getElementById("checkout-button").addEventListener("click", toggleCheckoutForm);
document.getElementById("clear-cart").addEventListener("click", clearCart);

document.getElementById("checkout-form").addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Thank you for your order!");
  clearCart();
  toggleCheckoutForm();
});
