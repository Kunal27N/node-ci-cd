const express = require('express');
const app = express();
const PORT = 3000;

const password = "mySuperSecret123"; // Sensitive info
const apiKey = "AIzaSyD...";

app.get('/', (req, res) => {
  res.send('Hello from Node.js App with CI/CD and SonarQube!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
