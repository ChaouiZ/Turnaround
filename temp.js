shippingOptionSelection.addEventListener("change", () => {
  if (
    shippingOptionSelection.children[0].selected ||
    shippingOptionSelection.children[1].selected
  ) {
    document.getElementById("shipping-time-input-wrapper").style.display =
      "none";
    totalShippingDays = 0;
    document.getElementById("shipping-time").value = "0";
  } else {
    document.getElementById("shipping-time-input-wrapper").style.display =
      "flex";
  }
});

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
