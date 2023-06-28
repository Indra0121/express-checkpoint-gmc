const express = require('express');
const app = express();
const port = 3000;

// Middleware to verify working hours
const checkWorkingHours = (req, res, next) => {
  const date = new Date();
  const day = date.getDay(); // Sunday is 0, Monday is 1, etc.
  const hour = date.getHours();
  
  // Check if it's a weekday and within working hours
  if (day > 0 && day < 6 && hour >= 9 && hour < 17) {
    next(); // Move to the next middleware or route handler
  } else {
    res.send('Sorry, the web application is only available during working hours (Monday to Friday, from 9 to 17).');
  }
};

// Middleware to serve static files (CSS, images, etc.)
app.use(express.static('public'));

// Apply the working hours middleware to all routes
app.use(checkWorkingHours);

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/home.html');
});

app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/views/services.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/views/contact.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
