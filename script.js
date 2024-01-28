let leapYear;


let currentDate = new Date();

let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth() + 1;
let todayDate = currentDate.getDate();

console.log(`Today is ${currentMonth}/${todayDate}/${currentYear}`);


let productionTime = 2;
let shippingTime = 3;
let designTime = 5;

if (currentYear % 400 === 0 || (currentYear % 4 === 0 && currentYear % 100 !== 0)) {
        leapYear = true;
}

let daysInMonth;

if (currentMonth === 1 || currentMonth === 3 || currentMonth === 5 ||
    currentMonth === 7 || currentMonth === 8 || currentMonth === 10 ||
     currentMonth === 12) {
        daysInMonth = 31;
     } else if (currentMonth === 4 || currentMonth === 6 || currentMonth === 9 || 
                currentMonth === 11) {
                    daysInMonth = 30;
                } else {
                    if(leapYear === true) {
                        daysInMonth = 29;
                    } else {
                        daysInMonth = 28;
                    }
                }

let eta = todayDate + productionTime + shippingTime + designTime;

function calculateInitialETA() {


    if (eta > daysInMonth) {
        eta -= daysInMonth;
        currentMonth++;
    }
    console.log(`Your current ETA is ${currentMonth}/${eta}/${currentYear}`);
}
  
calculateInitialETA();






  let userInput = prompt("How many days did it take to get design approval?");




//console.log(userInput);
function calculateApprovalEta() {
    let designTimeCredit;
    let designTimeDebt;
    let newEta;

    if (userInput <= designTime) {
        designTimeCredit = designTime -= userInput;
        newEta = eta -= designTimeCredit;
        
        if (newEta <= 0) {
           currentMonth--;
           newEta = daysInMonth - newEta;
        }

        console.log(`Your new ETA is ${currentMonth}/${newEta}/${currentYear}`);
    }
}


calculateApprovalEta();