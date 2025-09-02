const express = require("express");
// const fetch = require("node-fetch"); // if using Node <18
//  no need to install and use node-fetch because node v22.15.1 version is already install
require("dotenv").config();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const apiKey = process.env.WEATHER_API_KEY;

// Serve static files (frontend HTML, CSS, JS, images)
app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "public")));

app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
  
  try {
    const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
    let data = await response.json();
    res.json(data);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
