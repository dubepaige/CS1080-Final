// Variables for the current month and year
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Store events as an array of objects
const events = [
  { date: new Date(currentYear, currentMonth, 5), description: "Local Art Fair" },
  { date: new Date(currentYear, currentMonth, 14), description: "Outdoor Market" },
  { date: new Date(currentYear, currentMonth, 22), description: "Pop-up Shop at Riverwalk" }
];

// Function to render the calendar with events
function renderCalendar(month, year) {
  const monthYearHeader = document.getElementById("calendar-month-year");
  const calendarGrid = document.querySelector(".calendar-grid");

  monthYearHeader.textContent = new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" });
  calendarGrid.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Fill calendar with blank cells and date cells
  for (let i = 0; i < firstDay + daysInMonth; i++) {
    const cell = document.createElement("div");
    if (i >= firstDay) {
      const day = i - firstDay + 1;
      cell.textContent = day;

      // Check if there's an event on this date
      const event = events.find(e => e.date.getDate() === day && e.date.getMonth() === month && e.date.getFullYear() === year);
      if (event) {
        const eventDiv = document.createElement("div");
        eventDiv.textContent = event.description;
        eventDiv.classList.add("calendar-event");
        cell.appendChild(eventDiv);
      }
    }
    calendarGrid.appendChild(cell);
  }
}

// Event listeners for month navigation
document.getElementById("prev-month").onclick = () => {
  currentMonth = (currentMonth - 1 + 12) % 12;
  if (currentMonth === 11) currentYear--;
  renderCalendar(currentMonth, currentYear);
};

document.getElementById("next-month").onclick = () => {
  currentMonth = (currentMonth + 1) % 12;
  if (currentMonth === 0) currentYear++;
  renderCalendar(currentMonth, currentYear);
};

// Initialize calendar on page load
window.onload = () => renderCalendar(currentMonth, currentYear);
