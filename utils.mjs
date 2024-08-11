function checkIfSpanStartsSatOrSun(dateObject) {
  if (new Date(dateObject).getDay() === 6) {
    return 2;
  } else if (new Date(dateObject).getDay() === 0) {
    return 1;
  } else {
    return 0;
  }
}

function doesSpanCrossWeekend(dateObject, n) {
  const finalDay = addDays(dateObject, n);

  const differenceInEpTime =
    new Date(finalDay).getTime() - new Date(dateObject).getTime();
  const differenceInDays = differenceInEpTime / (1000 * 3600 * 24);
}
// function doesSpanCrossWeekend(earliestDate, latestDate) {
//   const daysArray = [];

//   for (let i = earliestDate.getDate() + 1; i <= latestDate.getDate(); i++) {
//     let newDate = new Date(earliestDate);
//     newDate.setDate(i);
//     let day = newDate.getDay();
//     daysArray.push(day);
//   }

//   console.log(daysArray);

//   if (daysArray.includes(6) || daysArray.includes(0)) {
//     return true;
//   }
//   return false;
// }

// function printDateTimeInput(n) {
//   console.log(n);
// }

function recalculateEta(approvalDateObject, n) {}

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
