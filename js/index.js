// Sample products
const products = [
    { id: 1, name: "Product 1", price: 15.99, image: "images/product1.jpg" },
    { id: 2, name: "Product 2", price: 25.99, image: "images/product2.jpg" },
    { id: 3, name: "Product 3", price: 35.99, image: "images/product3.jpg" }
  ];
  
  let cartCount = 0;
  
  // Function to render products in the product section
  function renderProducts() {
    const productList = document.querySelector(".product-list");
    products.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      `;
      productList.appendChild(productDiv);
    });
  }
  
  // Event listener for Add to Cart buttons
  document.body.addEventListener("click", event => {
    if (event.target.classList.contains("add-to-cart")) {
      cartCount++;
      document.getElementById("cart-button").textContent = `Cart (${cartCount})`;
    }
  });
  
  // Initialize products on page load
  window.onload = () => renderProducts();
  