// calendar.js

document.addEventListener("DOMContentLoaded", function () {
    const monthYear = document.getElementById("month-year");
    const calendarGrid = document.querySelector(".calendar-grid");
    const events = {
      "2024-11-15": "Craft Fair",
      "2024-11-20": "Farmers Market",
      "2024-11-28": "Holiday Pop-up"
    };
  
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
  
    function renderCalendar() {
      const firstDay = new Date(currentYear, currentMonth, 1).getDay();
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      calendarGrid.innerHTML = "";
  
      // Set month and year header
      monthYear.textContent = new Date(currentYear, currentMonth).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
  
      // Empty slots before first day
      for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement("div");
        calendarGrid.appendChild(emptyCell);
      }
  
      // Fill in dates with possible events
      for (let date = 1; date <= daysInMonth; date++) {
        const fullDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
        const dateCell = document.createElement("div");
        dateCell.classList.add("calendar-date");
        dateCell.textContent = date;
  
        if (events[fullDate]) {
          dateCell.classList.add("event");
          dateCell.title = events[fullDate];
        }
  
        calendarGrid.appendChild(dateCell);
      }
    }
  
    document.getElementById("prev-month").addEventListener("click", () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar();
    });
  
    document.getElementById("next-month").addEventListener("click", () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar();
    });
  
    renderCalendar();
  });
  