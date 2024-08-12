// import { getTotalDays } from "./utils.mjs";

const orderDateInput = document.querySelector("#order-date-input");
const orderDateHolder = { value: new Date() };

const productionDaysInput = document.querySelector(".production-time-input");
const productionDaysHolder = { value: 0 };

const shippingOptionSelection = document.querySelector("#shipping-or-pickup");

const shippingDaysInput = document.querySelector(".shipping-time-input");
const shippingDaysHolder = { value: 0 };

const approvalDateInput = document.querySelector("#approval-date-input");
const approvalDateHolder = { value: new Date() };

const eta = { value: new Date() };
const shipByDate = { value: new Date() };

function addDays(dateObject, n) {
  const result = new Date(dateObject);
  result.setDate(dateObject.getDate() + n);
  return result;
}

function doesSpanCrossWeekend(dateObject, n) {
  const finalDay = addDays(dateObject, n);

  return (
    new Date(finalDay).getDay() - new Date(dateObject).getDay() < 0 ||
    n > 4 ||
    finalDay.getDay() === 6 ||
    finalDay.getDay() === 0
  );
}

function getTotalDays(dateObject, daySpan) {
  let totalDays = daySpan;
  if (doesSpanCrossWeekend(dateObject, daySpan)) {
    totalDays += 2;
  }
  return totalDays;
}

function checkIfBeforeCutoff(dateObject) {
  return new Date(dateObject).getHours() < 11;
}

function checkIfOnWeekend(dateObject) {
  return (
    new Date(dateObject).getDay() === 6 || new Date(dateObject).getDay() === 0
  );
}

function calculateEta() {
  let productionDays = Number(productionDaysHolder.value);
  let shippingDays = Number(shippingDaysHolder.value);
  let orderDate = new Date(orderDateHolder.value);

  let totalProductionDays = getTotalDays(orderDate, productionDays);
  shipByDate.value = addDays(
    new Date(addDays(orderDate, totalProductionDays)),
    1
  );
  let etaModifier = totalProductionDays + shippingDays;

  console.log(`Ship By ${shipByDate.value}`);
  console.log(`wknd ${checkIfOnWeekend(orderDate)}`);
  console.log(checkIfBeforeCutoff(orderDate));

  eta.value = addDays(orderDate, etaModifier);

  console.log(`ETA: ${eta.value}`);
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
