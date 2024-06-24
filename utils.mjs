function checkIfSpanStartsSatOrSun(dateObject) {
  if (new Date(dateObject).getDay() === 6) {
    return 2;
  } else if (new Date(dateObject).getDay() === 0) {
    return 1;
  } else {
    return 0;
  }
}

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

// function printDateTimeInput(n) {
//   console.log(n);
// }

function recalculateEta(approvalDateObject, n) {}

function addDays(dateObject, n) {
  return new Date(dateObject.setDate(dateObject.getDate() + n));
}

function subtractDays(dateObject, n) {
  return new Date(dateObject.setDate(dateObject.getDate() - n));
}

function getTotalDays(businessDays, dateObject) {
  let totalDays = businessDays;
  let weekendStartCheckedDateObject = addDays(
    new Date(dateObject),
    checkIfSpanStartsSatOrSun(new Date(dateObject))
  );
  totalDays += checkIfSpanStartsSatOrSun(new Date(dateObject));
  let finalDay = addDays(new Date(weekendStartCheckedDateObject), businessDays);
  console.log(`Final "Business" Day: ${finalDay}`);
  if (doesSpanCrossWeekend(new Date(weekendStartCheckedDateObject), finalDay)) {
    totalDays += 2;
    console.log(
      doesSpanCrossWeekend(new Date(weekendStartCheckedDateObject), finalDay)
    );
  }
  let finalFinalDay = new Date(
    addDays(new Date(weekendStartCheckedDateObject), totalDays)
  );
  console.log(`Final Day accounting for weekend: ${finalFinalDay}`);
  return totalDays;
}

export {
  subtractDays,
  addDays,
  doesSpanCrossWeekend,
  getTotalDays,
  recalculateEta,
};
