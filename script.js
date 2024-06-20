function doesSpanCrossWeekend(earliestDate, latestDate) {
  const daysArray = [];

  for (let i = earliestDate.getDate() + 1; i <= latestDate.getDate(); i++) {
    let newDate = new Date(earliestDate);
    newDate.setDate(i);
    let day = newDate.getDay();
    daysArray.push(day);
  }

  console.log(daysArray);

  if (daysArray.includes(6) || daysArray.includes(0)) {
    return true;
  }
  return false;
}

function printDateTimeInput(n) {
  console.log(n);
}

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

function recalculateEta(approvalDateObject, n) {}

function addDays(dateObject, n) {
  return new Date(dateObject.setDate(dateObject.getDate() + n));
}

function subtractDays(dateObject, n) {
  return new Date(dateObject.setDate(dateObject.getDate() - n));
}

function getTotalDays(businessDays, dateObject) {
  let totalDays = businessDays;
  let finalDay = addDays(new Date(dateObject), businessDays);
  console.log(`Final "Business" Day: ${finalDay}`);
  if (doesSpanCrossWeekend(new Date(dateObject), finalDay)) {
    totalDays += 2;
    console.log(doesSpanCrossWeekend(new Date(dateObject), finalDay));
  }
  let finalFinalDay = new Date(addDays(new Date(dateObject), totalDays));
  console.log(`Final Day accounting for weekend: ${finalFinalDay}`);
  return totalDays;
}

const shippingOptionSelection = document.getElementById("shipping-or-pickup");

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

const saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", function () {
  if (document.getElementById("design-time").value === "yes") {
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

  totalDesignDays = getTotalDays(businessDesignDaysInput, new Date(orderDate));
  totalProductionDays = getTotalDays(
    businessProductionDaysInput,
    new Date(addDays(new Date(orderDate), totalDesignDays))
  );
  //   shipByModifier = totalDesignDays + totalProductionDays + bufferDays;
  //   initializeShipByDate(anew Date(addDays(new Date(orderDate).getDate() + ddDays(new Date(orderDate), shipByModifier));
  totalShippingDays = getTotalDays(
    businessShippingDaysInput,
    new Date(
      addDays(
        new Date(orderDate),
        totalDesignDays + totalProductionDays + bufferDays
      )
    )
  );

  console.log(totalDesignDays);
  console.log(totalProductionDays);
  console.log(totalShippingDays);

  etaModifier = totalDesignDays + totalProductionDays + totalShippingDays;

  initializeEta(new Date(dateTimeInput));
  initializeShipByDate(
    new Date(
      addDays(new Date(orderDate), totalDesignDays + totalProductionDays)
    )
  );

  orderDateOutput.innerHTML = orderDate.toDateString();

  printDateTimeInput(dateTimeInput);
  console.log(`OrderDate ${orderDate}`);
  console.log(`Ship-by Date ${shipByDate}`);
  console.log(`ETA: ${eta}`);
  console.log("   \n    \n    ");
});
