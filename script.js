let businessProductionDays = 3;
let businessDeliveryDays = 2;
let bufferDays = 1;
let designDays = 1;
//need business prod and business shipping days
//need functions to generate total prod and shipping days (accounting for weekends)
class OrderTimes {
    constructor(orderPlacedDate) {
        this.orderDate = new Date(orderPlacedDate);
        this.calculateEta();
    }
   
    calculateEta() {
        this.eta = new Date(this.orderDate.setDate(this.orderDate + businessProductionDays + designDays + businessDeliveryDays - bufferDays));
        return this.eta;
    }
}


// let etaModifier = orderDate.getDate() + businessProductionDays + businessDeliveryDays - bufferDays;
// let shipByModifier = orderDate.getDate() + businessProductionDays - bufferDays;

// eta.setDate(etaModifier);
// shipByDate.setDate(shipByModifier);

// const daysArray = [];


// for (let i = orderDate.getDate(); i <= shipByDate.getDate(); i++) {
//     let newDate = new Date(orderDate);
//     newDate.setDate(i);
//     let day = newDate.getDay();
//     daysArray.push(day);
//   }
 
//   if (daysArray.includes(6) || daysArray.includes(0)) {
//     etaModifier += 2;
//     eta.setDate(etaModifier);
//   }
  

let order = new OrderTimes(2024, 6, 15);

console.log(order.orderDate);


// console.log(daysArray);
// console.log(etaModifier, shipByModifier);
// console.log(`The order was placed on ${orderDate.toDateString()}. \nThe ETA is ${eta.toDateString()}. \nThis order should be shipped by ${shipByDate.toDateString()}.`);
