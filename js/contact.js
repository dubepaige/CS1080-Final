function saveToCSV() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
  
    if (!name || !email || !message) {
      alert("Please fill out all fields.");
      return;
    }
  
    // Prepare CSV data
    const csvContent = "data:text/csv;charset=utf-8," + 
                       "Name,Email,Message\n" + 
                       `"${name}","${email}","${message}"`;
  
    // Create a download link and click it to save the file
    const encodedUri = encodeURI(csvContent);
    const downloadLink = document.createElement("a");
    downloadLink.setAttribute("href", encodedUri);
    downloadLink.setAttribute("download", "custom_order.csv");
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  
    // Clear the form fields after submission
    document.getElementById("contactForm").reset();
  }
  