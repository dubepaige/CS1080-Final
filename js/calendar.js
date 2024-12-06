document.addEventListener("DOMContentLoaded", function () {
  const monthYear = document.getElementById("month-year");
  const calendarGrid = document.querySelector(".calendar-grid");
  const eventInfo = document.getElementById("event-info");
  const eventList = document.getElementById("event-list");
  const calendarSection = document.getElementById("calendar-section");
  const listSection = document.getElementById("list-section");
  
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
    },
    "2024-12-10": {
      title: "Holiday Craft Show",
      description: "Join us for the annual holiday craft show!"
    },
    "2024-12-15": {
      title: "Christmas Bizzare",
      description: "Get those last minute Christmas presents!",
      location: "Davis Center, Grand Maple Ballroom",
      time: "9:00am - 3:00pm"
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

  function renderListView() {
    eventList.innerHTML = ""; // Clear current list

    for (const [date, event] of Object.entries(events)) {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${date}</strong>: ${event.title} - ${event.description}`;
      eventList.appendChild(li);
    }
  }

  function showEventDetails(date) {
    if (events[date]) {
      eventInfo.innerHTML = `<strong>${events[date].title}</strong>: ${events[date].description}`;
    } else {
      eventInfo.textContent = "No events scheduled for this date.";
    }
  }

  // View toggle buttons
  document.getElementById("calendar-view-btn").addEventListener("click", () => {
    calendarSection.classList.remove("hidden");
    listSection.classList.add("hidden");
  });

  document.getElementById("list-view-btn").addEventListener("click", () => {
    calendarSection.classList.add("hidden");
    listSection.classList.remove("hidden");
    renderListView();
  });

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

  renderCalendar(); // Initial render
});
