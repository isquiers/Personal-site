const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");


// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

function renderCalendar() {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
            && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }
    const currentDate = document.querySelector(".current-date");

    if (currentDate) {
      currentDate.innerText = `${months[currMonth]} ${currYear}`;
    } else {
      console.error("Element with class 'current-date' not found.");
    }
        daysTag.innerHTML = liTag;

    const dayItems = document.querySelectorAll('.days li');
    dayItems.forEach(item => {
        item.addEventListener('click', function () {
            const dayNumber = this.textContent.trim(); // Get the text content of the clicked item and trim any whitespace
            runFunctionBasedOnDay(dayNumber); // Call a function based on the text content of the clicked item
        });
    });
}
renderCalendar();

function openForm() {
  document.getElementById("myForm").style.display = "flex";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        console.log("button clicked and here is the month ", currMonth);

        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});

// Need to reload this after render calendar is called by clicking the icon
const dayItems = document.querySelectorAll('.days li');

dayItems.forEach(item => {
    item.addEventListener('click', function() {
      const dayNumber = this.textContent.trim(); // Get the text content of the clicked item and trim any whitespace
      runFunctionBasedOnDay(dayNumber); // Call a function based on the text content of the clicked item
    });
});

// Test day reaction
function runFunctionBasedOnDay(dayNumber) {
  // Run a function based on the day number
  console.log(`Clicked on day ${dayNumber}`);
  document.getElementById("dt_selection").innerText = `Selected ${months[currMonth]} ${dayNumber}`;
  openForm();
}

function selectTimebox(button) {
    // Deselect all other timebox buttons
    var timeboxes = document.getElementsByClassName("timebox");
    for (var i = 0; i < timeboxes.length; i++) {
        if (timeboxes[i] !== button) {
            timeboxes[i].classList.remove("selected");
        }
    }
    // Toggle the selected class on the clicked button
    button.classList.toggle("selected");

    // Get the selected timebox value
    var selectedTimebox = button.value;

    // Get the dt_selection h1 text
    var dtSelection = document.getElementById("dt_selection").textContent;
}

const form = document.querySelector('#myForm');
const calendarWrapper = document.querySelector('.calendar-wrapper');

function sendEmail() {
  const xhr = new XMLHttpRequest();
  const email = document.querySelector('input[name="email"]').value;
  const name = document.querySelector('input[name="name"]').value;
  const date = document.querySelector('#dt_selection').textContent;
  const timebox = document.querySelector('.timebox.selected')?.value ?? 'not selected';

  xhr.open('POST', '/send_email', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
        closeForm();
        calendarWrapper.style.display = 'none';
      } else {
        console.error(xhr.statusText);
      }
    }
  };
  xhr.send(`email=${email}&name=${name}&date=${date}&timebox=${timebox}`);
}

form.addEventListener('submit', event => {
  event.preventDefault();
  sendEmail();
});