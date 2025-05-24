require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  const apiKey = "740cdf696f644c4dd10da03b570a3a28"; // Replace with your actual API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  console.log("📍 City requested:", city);
  console.log("🔑 API Key:", apiKey);
  console.log("🌐 Full URL:", url);

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("❌ API call failed:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
