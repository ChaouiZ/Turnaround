const orderDateInput = document.querySelector("#order-date-input");
let orderDate = orderDateInput.value;

orderDateInput.addEventListener("change", () => {
  orderDate = orderDateInput.value;
  console.log(orderDate);
});
