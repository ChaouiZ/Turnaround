function initializeOrderDate(date = new Date()) {
  orderDate = new Date(date);
  // console.log(`forderdate ${orderDate}`);
  //   return orderDate;
}

function initializeShipByDate(dateObject) {
  shipByDate = new Date(dateObject);
}

function initializeEta(date) {
  eta = new Date(date.setDate(date.getDate() + etaModifier));
  return eta;
}

function getInputs() {
  approvalBoolInput = document.getElementById("approval-bool");

  if (approvalBoolInput.value === "yes") {
    businessDesignDaysInput = 1;
  } else {
    businessDesignDaysInput = 0;
  }

  dateTimeInput = document.getElementById("datetime").value;
  initializeOrderDate(new Date(dateTimeInput));

  businessProductionDaysInput = Number(
    document.getElementById("production-time").value
  );
  businessShippingDaysInput = Number(
    document.getElementById("shipping-time").value
  );
}

export { initializeEta, initializeOrderDate, initializeShipByDate, getInputs };
