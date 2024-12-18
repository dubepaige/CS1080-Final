document.addEventListener("DOMContentLoaded", function () {
  const monthYear = document.getElementById("month-year");
  const calendarGrid = document.querySelector(".calendar-grid");
  const eventInfo = document.getElementById("event-info");
  const eventList = document.getElementById("event-list");
  const calendarSection = document.getElementById("calendar-section");
  const listSection = document.getElementById("list-section");

  const events = {
    "2024-12-07": {
      title: "Craft Fair",
      description: "Join us at the local craft fair to explore our handmade products and unique items!",
      location: "UVM Davis center, Grand Sugar Maple Ballroom",
      time: "12:00pm - 3:00pm",
      date: "December 7th, 2024"
    },
    "2024-12-08": {
      title: "Indoor Farmers Market",
      description: "Catch us at the Indoor Farmers Market! Perfect opportunity to see our latest products in person.",
      location: "South Burlington High School Gym",
      time: "9:00am - 4:00pm",
      date: "December 8th, 2024"
    },
    "2024-12-14": {
      title: "Holiday Pop-up",
      description: "Get ready for holiday shopping at our special pop-up event!",
      location: "UVM Davis center, Livak Ballroom",
      time: "12:00pm - 3:00pm",
      date: "December 14th, 2024"
    },
    "2024-12-15": {
      title: "Holiday Craft Show",
      description: "Join us for the annual holiday craft show!",
      location: "University Mall, In front of the entrance to JC Penney's",
      time: "10:00am - 4:00pm",
      date: "December 15th, 2024"
    },
    "2024-12-21": {
      title: "Christmas Bizarre",
      description: "Get those last-minute Christmas presents!",
      location: "Davis Center, Grand Silver Maple Ballroom",
      time: "9:00am - 3:00pm",
      date: "December 21st, 2024"
    },
    "2024-12-22": {
      title: "25th Annual Craft Fair and Bake Sale",
      description: "Last chance to grab those holiday gifts and stocking stuffers!",
      location: "Essex High School, Multipurpose Room",
      time: "10:00am - 4:00pm",
      date: "December 22nd, 2024"
    },
    "2025-01-04": {
      title: "New Year's Craft Festival",
      description: "New year, new plushies! Come check out the newest additions to our inventory.",
      location: "Davis Center, Room 400",
      time: "12:00pm - 3:00pm",
      date: "January 4th, 2025"
    },
    "2025-01-12": {
      title: "Indoor Farmers Market",
      description: "Catch us at the Indoor Farmers Market! Perfect opportunity to see and feel our latest products.",
      location: "South Burlington High School Gym",
      time: "9:00am - 4:00pm",
      date: "January 12th, 2025"
    },
    "2025-01-18": {
      title: "5th Annual Vendor Show",
      description: "A chance for you to come meet our team and check out the new product line!",
      location: "Essex High School Gym",
      time: "11:00am - 3:00pm",
      date: "January 8th, 2025"
    },
    "2025-01-26": {
      title: "Indoor Farmers Market",
      description: "Catch us at the Indoor Farmers Market! We're here every other Sunday in January.",
      location: "South Burlington High School Gym",
      time: "9:00am - 4:00pm",
      date: "January 26th, 2025"
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

      // Add click event for all dates
      dateCell.addEventListener("click", () => showEventDetails(fullDate));

      // Highlight dates with events
      if (events[fullDate]) {
        dateCell.classList.add("event");
        dateCell.title = events[fullDate].title;
      }

      calendarGrid.appendChild(dateCell);
    }
  }

  function showEventDetails(date) {
    if (events[date]) {
      let eventHTML = `<strong>${events[date].title}</strong>: ${events[date].description}`;
      if (events[date].location) {
        eventHTML += `<br><strong>Location:</strong> ${events[date].location}`;
      }
      if (events[date].time) {
        eventHTML += `<br><strong>Time:</strong> ${events[date].time}`;
      }
      if (events[date].date) {
        eventHTML += `<br><strong>Date:</strong> ${events[date].date}`;
      }
      eventInfo.innerHTML = eventHTML;
    } else {
      eventInfo.innerHTML = "No events scheduled for this date.";
    }
  }

  function renderListView() {
    eventList.innerHTML = ""; // Clear current list

    for (const [date, event] of Object.entries(events)) {
      const li = document.createElement("li");

      let eventHTML = `<strong>${date}</strong>: ${event.title} - ${event.description}`;
      if (event.location) {
        eventHTML += `<br><strong>Location:</strong> ${event.location}`;
      }
      if (event.time) {
        eventHTML += `<br><strong>Time:</strong> ${event.time}`;
      }
      li.innerHTML = eventHTML;
      eventList.appendChild(li);
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

  renderCalendar();
});
