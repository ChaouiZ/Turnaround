let businessProductionDaysInput;
let businessShippingDaysInput;
let dateTimeInput;
let businessDesignDaysInput;

let approvalBoolInput;

const orderDateOutput = document.getElementById("order-date");
const etaOutput = document.getElementById("ETA-date");
const shippingOptionSelection = document.getElementById("shipping-or-pickup");
const saveButton = document.getElementById("save-button");

// orderDateOutput.innerHTML = "Hello";

// let bufferDays = 1;
let isApproved = false;

let totalDesignDays;
let totalProductionDays;
let totalShippingDays;

// let shipByModifier;
let etaModifier;

let orderDate;
let eta;
let shipByDate;
let approvalDate;
