import {
  initializeEta,
  initializeOrderDate,
  initializeShipByDate,
} from "./initialize.mjs";

import {
  doesSpanCrossWeekend,
  getTotalDays,
  addDays,
  subtractDays,
  recalculateEta,
} from "./utils.mjs";

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
  approvalBoolInput = document.getElementById("approval-bool");

  if ((approvalBoolInput.value = "yes")) {
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

  console.log(`OrderDate ${orderDate}`);
  console.log(`Ship-by Date ${shipByDate}`);
  console.log(`ETA: ${eta}`);
  console.log("   \n    \n    ");
});
