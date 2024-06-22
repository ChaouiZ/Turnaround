import {
  initializeEta,
  initializeOrderDate,
  initializeShipByDate,
  getInputs,
} from "./initialize.mjs";

import {
  doesSpanCrossWeekend,
  getTotalDays,
  addDays,
  subtractDays,
  recalculateEta,
} from "./utils.mjs";

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

saveButton.addEventListener("click", function () {
  getInputs();

  const ifPlacedBeforeCutoff = new Date(subtractDays(new Date(orderDate), 1));

  if (orderDate.getHours() < 11) {
    totalDesignDays = getTotalDays(
      businessDesignDaysInput,
      new Date(ifPlacedBeforeCutoff)
    );
    totalProductionDays = getTotalDays(
      businessProductionDaysInput,
      new Date(addDays(new Date(ifPlacedBeforeCutoff), totalDesignDays))
    );
    totalShippingDays = getTotalDays(
      businessShippingDaysInput,
      new Date(
        addDays(
          new Date(ifPlacedBeforeCutoff),
          totalDesignDays + totalProductionDays
        )
      )
    );
  } else {
    totalDesignDays = getTotalDays(
      businessDesignDaysInput,
      new Date(orderDate)
    );
    totalProductionDays = getTotalDays(
      businessProductionDaysInput,
      new Date(addDays(new Date(orderDate), totalDesignDays))
    );
    totalShippingDays = getTotalDays(
      businessShippingDaysInput,
      new Date(
        addDays(new Date(orderDate), totalDesignDays + totalProductionDays)
      )
    );
  }

  console.log(totalDesignDays);
  console.log(totalProductionDays);
  console.log(totalShippingDays);

  etaModifier = totalDesignDays + totalProductionDays + totalShippingDays;

  if (orderDate.getHours() < 11) {
    initializeEta(new Date(ifPlacedBeforeCutoff));
  } else {
    initializeEta(new Date(dateTimeInput));
  }

  initializeShipByDate(
    new Date(
      addDays(new Date(orderDate), totalDesignDays + totalProductionDays)
    )
  );

  orderDateOutput.innerHTML = orderDate.toDateString();

  console.log(`OrderDate ${orderDate}`);
  console.log(`Ship-by Date ${shipByDate}`);
  console.log(`ETA: ${eta}`);
  console.log("   \n    \n    ");
});
