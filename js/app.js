const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();


// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);

  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="single-product h-100 text-center">
      <div class="d-flex justify-content-center bg-white p-2 image-container">
        <img class="product-image" src=${image}></img>
      </div>
      <div>
        <h5 class=" text-success mt-2">${product.title}</h5>
        <small style="margin-bottom: 0;">Category: ${product.category}</small>
        <h3 class=" text-success">Price: $ ${product.price}</h3>
        <p>Rating: ${product.rating.rate}<i class="fas fa-star text-warning"></i> (${product.rating.count} Ratings)</p>
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn     btn-success">add to
          cart</button>
        <button id="details-btn" class="btn btn-warning text-success fw-bold" >Details</button>
      </div>
    </div>
    `;
    document.getElementById("all-products").appendChild(div);
  }
};

// clear all data
const clearData = () => {

}

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

// return all prices for calculate total price
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
  updateTotal();
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal();
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
