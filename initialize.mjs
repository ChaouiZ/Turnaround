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

export { initializeEta, initializeOrderDate, initializeShipByDate };
