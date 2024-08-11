const orderDateInput = document.querySelector("#order-date-input");
let orderDateHolder = { value: undefined };

const productionDaysInput = document.querySelector(".production-time-input");
let productionDaysHolder = { value: 0 };

const shippingOptionSelection = document.querySelector("#shipping-or-pickup");

const shippingDaysInput = document.querySelector(".shipping-time-input");
let shippingDaysHolder = { value: 0 };

let eta;

function addDays(dateObject, n) {
  const result = new Date(dateObject);
  result.setDate(dateObject.getDate() + n);
  return result;
}

function subtractDays(dateObject, n) {
  const result = new Date(dateObject);
  result.setDate(dateObject.getDate() - n);
  return result;
}

function calculateEta() {
  let productionDays = Number(productionDaysHolder.value);
  let shippingDays = Number(shippingDaysHolder.value);
  let orderDate = new Date(orderDateHolder.value);
  let etaModifier = productionDays + shippingDays;

  eta = addDays(orderDate, etaModifier);

  console.log(eta);
}

function print() {
  console.log(orderDateHolder.value);
}

function assignEventListener(input, valueHolder) {
  input.addEventListener("change", () => {
    valueHolder.value = input.value;
    print();
    calculateEta();
  });
}

assignEventListener(orderDateInput, orderDateHolder);
assignEventListener(productionDaysInput, productionDaysHolder);
assignEventListener(shippingDaysInput, shippingDaysHolder);

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
