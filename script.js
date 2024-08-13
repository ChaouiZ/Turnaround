// import { getTotalDays } from "./utils.mjs";

const orderDateInput = document.querySelector("#order-date-input");
const orderDateHolder = { value: new Date() };

const productionDaysInput = document.querySelector(".production-time-input");
const productionDaysHolder = { value: 0 };

const shippingOptionSelection = document.querySelector("#shipping-or-pickup");
const approvalCheckInput = document.querySelector(".approval-bool-input");

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
  console.log(`appinwkndchckfnc ${new Date(dateObject)}`);
  return (
    new Date(dateObject).getDay() === 6 || new Date(dateObject).getDay() === 0
  );
}

function moveToMondayMorning(dateObject) {
  let tempDate = new Date(dateObject);
  const dayOfWeek = tempDate.getDay();

  if (dayOfWeek === 6) {
    tempDate = addDays(new Date(tempDate), 2);
    tempDate.setHours(8, 0, 0);
  } else if (dayOfWeek === 0) {
    tempDate = addDays(new Date(tempDate), 1);
    tempDate.setHours(8, 0, 0);
  }

  console.log(`temp ${tempDate}`);
  return new Date(tempDate);
}

function displayDates() {
  const shipByDateDisplay = document.querySelector(".shipby-date-display");
  const etaDate = document.querySelector(".ETA-display");

  if (approvalCheckInput.value === "no") {
    shipByDateDisplay.innerHTML = "N/A";
  }
  shipByDateDisplay.innerHTML = shipByDate.value.toDateString();
  etaDate.innerHTML = eta.value.toDateString();
}

function calculateEta() {
  let productionDays = Number(productionDaysHolder.value);
  let shippingDays = Number(shippingDaysHolder.value);
  let orderDate = new Date(orderDateHolder.value);
  let approvalDate = new Date(approvalDateHolder.value);

  if (approvalCheckInput.value === "no") {
    approvalDate = new Date(orderDate);
  }

  if (approvalCheckInput.value === "yes") {
    productionDays += 1;
  }

  if (checkIfOnWeekend(approvalDate)) {
    approvalDate = moveToMondayMorning(approvalDate);
  }
  console.log(`appafterwkndchck ${approvalDate}`);
  if (checkIfBeforeCutoff(approvalDate) && productionDays > 0) {
    productionDays -= 1;
  }
  console.log(`proddays ${productionDays}`);
  console.log(`App: ${approvalDate}`);

  let totalProductionDays = getTotalDays(approvalDate, productionDays);
  shipByDate.value = new Date(addDays(approvalDate, totalProductionDays));
  let totalShippingDays = getTotalDays(shipByDate.value, shippingDays);
  let etaModifier = totalProductionDays + totalShippingDays;

  console.log(`Ship By ${shipByDate.value}`);
  // s

  eta.value = addDays(approvalDate, etaModifier);

  console.log(`ETA: ${eta.value}`);
  displayDates();
}

function print(value) {
  console.log(value);
}

function assignEventListener(input, valueHolder) {
  input.addEventListener("change", () => {
    valueHolder.value = input.value;
    print(valueHolder.value);
    calculateEta();
  });
}

assignEventListener(orderDateInput, orderDateHolder);
assignEventListener(productionDaysInput, productionDaysHolder);
assignEventListener(shippingDaysInput, shippingDaysHolder);
assignEventListener(approvalDateInput, approvalDateHolder);

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

approvalCheckInput.addEventListener("change", () => {
  if (approvalCheckInput.value === "no") {
    document.querySelector(".approval-date-input-wrapper").style.display =
      "none";
    approvalDateHolder.value = orderDateHolder.value;
    approvalDateInput.value = orderDateHolder.value;
  } else {
    document.querySelector(".approval-date-input-wrapper").style.display =
      "flex";
  }
  calculateEta();
});
