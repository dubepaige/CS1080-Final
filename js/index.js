// calendar.js

document.addEventListener("DOMContentLoaded", function () {
    const monthYear = document.getElementById("month-year");
    const calendarGrid = document.querySelector(".calendar-grid");
    const eventInfo = document.getElementById("event-info");
    const events = {
      "2024-11-15": {
        title: "Craft Fair",
        description: "Join us at the local craft fair to explore our handmade products and unique items!"
      },
      "2024-11-20": {
        title: "Farmers Market",
        description: "Catch us at the Farmers Market! Perfect opportunity to see our latest products in person."
      },
      "2024-11-28": {
        title: "Holiday Pop-up",
        description: "Get ready for holiday shopping at our special pop-up event!"
      }
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
  
        // Highlight and add click event for dates with events
        if (events[fullDate]) {
          dateCell.classList.add("event");
          dateCell.title = events[fullDate].title;
          dateCell.addEventListener("click", () => showEventDetails(fullDate));
        }
  
        calendarGrid.appendChild(dateCell);
      }
    }
  
    function showEventDetails(date) {
      if (events[date]) {
        eventInfo.innerHTML = `<strong>${events[date].title}</strong>: ${events[date].description}`;
      } else {
        eventInfo.textContent = "No events scheduled for this date.";
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
  