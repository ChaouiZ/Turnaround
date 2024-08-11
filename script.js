const orderDateInput = document.querySelector("#order-date-input");
let orderDate = orderDateInput.value;

const productionDaysInput = document.querySelector(".production-time-input");
let productionDays = productionDaysInput.value;

const shippingOptionSelection = document.querySelector("#shipping-or-pickup");

const shippingDaysInput = document.querySelector(".shipping-time-input");
let shippingDays = shippingDaysInput.value;

function assignEventListener(input, value) {
  input.addEventListener("change", () => {
    value = input.value;
    console.log(value);
  });
}

assignEventListener(orderDateInput, orderDate);
assignEventListener(productionDaysInput, productionDays);
assignEventListener(shippingDaysInput, shippingDays);

shippingOptionSelection.addEventListener("change", () => {
  if (
    shippingOptionSelection.children[0].selected ||
    shippingOptionSelection.children[1].selected
  ) {
    document.getElementById("shipping-time-input-wrapper").style.display =
      "none";
    shippingDays = 0;
    document.getElementById("shipping-time").value = "0";
  } else {
    document.getElementById("shipping-time-input-wrapper").style.display =
      "flex";
  }
});
