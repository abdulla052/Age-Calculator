// Input
const dayInp = document.querySelector('.day-input');
const monthInp = document.querySelector('.month-input');
const yearInp = document.querySelector('.year-input');

let dayIsValid = false;
let monthIsValid = false;
let yearIsValid = false;

// Ouput 
const dayOut = document.querySelector('.dd');
const monthOut = document.querySelector('.mm');
const yearOut = document.querySelector('.yy');

//Submit Button 
const submitBtn = document.querySelector('.js-submit');

// Constants
const MAX_DAYS_IN_MONTH = 31;
const MAX_MONTHS_IN_YEAR = 12;


// Adding click action to the button
submitBtn.addEventListener('click', () => {
    if (dayIsValid && monthIsValid && yearIsValid) {
        if (validDaysInMonth(yearInp.value)) {
            adjustDateValues();
            displayDate();
        }
    }
});

function adjustDateValues() {
    if (dayInp.value > currentDay) {
        currentDay += months[currentMonth - 1];
        currentMonth--;
    }
    if (monthInp.value > currentMonth) {
        currentMonth += MAX_MONTHS_IN_YEAR;
        currentYear--;
    }
}

function displayDate() {
    const dd = currentDay - dayInp.value;
    const mm = currentMonth - monthInp.value;
    const yy = currentYear - yearInp.value;

    dayOut.innerHTML = dd;
    monthOut.innerHTML = mm;
    yearOut.innerHTML = yy;
}


let date = new Date(); //Thu Dec 28 2023 18:57:08 GMT+0300 (Arabian Standard Time)

let currentDay = date.getDate(); //getDate() is for getting the current day
let currentMonth = 1 + date.getMonth();//This method actually get you a month before your current month
let currentYear = date.getFullYear(); //for getting current year

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

dayInp.addEventListener('input', () => {
    if (!dayInp.value) {
        dayInp.style.borderColor = 'red';
        dayInp.parentElement.querySelector('small').innerText = "This field is required";
        dayIsValid = false;
    }
    else if (dayInp.value > MAX_DAYS_IN_MONTH || dayInp.value < 1) {
        dayInp.style.borderColor = 'red';
        dayInp.parentElement.querySelector('small').innerText = "enter a valid day."
        dayIsValid = false;
    } else {
        dayInp.style.borderColor = 'black';
        dayInp.parentElement.querySelector('small').innerText = "";
        dayIsValid = true;
    }
});

monthInp.addEventListener('input', () => {
    if (!monthInp.value) {
        monthInp.style.borderColor = 'red';
        monthInp.parentElement.querySelector('small').innerText = "This field is required";
        monthIsValid = false;
    }
    else if (monthInp.value > 12 || monthInp.value < 1) {
        monthInp.style.borderColor = 'red';
        monthInp.parentElement.querySelector('small').innerText = "enter a valid month."
        monthIsValid = false;
    } else {
        monthInp.style.borderColor = 'black';
        monthInp.parentElement.querySelector('small').innerText = "";
        monthIsValid = true;
    }
});


yearInp.addEventListener('input', () => {
    if (!yearInp.value) {
        yearInp.style.borderColor = 'red';
        yearInp.parentElement.querySelector('small').innerText = "This field is required";
        yearIsValid = false;
    }
    else if (yearInp.value > currentYear || yearInp.value < 1) {
        yearInp.style.borderColor = 'red';
        yearInp.parentElement.querySelector('small').innerText = `enter a valid year.`
        yearIsValid = false;
    } else {
        yearInp.style.borderColor = 'black';
        yearInp.parentElement.querySelector('small').innerText = "";
        yearIsValid = true;
    }
});

function validDaysInMonth(year) {
    months[1] = daysInFebruary(year);
    if (dayInp.value > months[monthInp.value - 1]) {
        dayInp.style.borderColor = 'red';
        dayInp.parentElement.querySelector('small').innerText = `day out of range 1 - ${months[monthInp.value - 1]}.`
        return false;
    } else {
        dayInp.style.borderColor = 'black';
        dayInp.parentElement.querySelector('small').innerText = ``
        return true;
    }
}

function daysInFebruary(year) {
    // Check if the year is a leap year
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
        return 29; // Leap year, February has 29 days
    } else {
        return 28; // Non-leap year, February has 28 days
    }
}