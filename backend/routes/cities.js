const express = require("express");
const router = express.Router();
const City = require("../models/City");

// Save a new city
router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const city = new City({ name });
    await city.save();
    res.status(201).json(city);
  } catch (error) {
    console.error("Error saving city:", error);
    res.status(500).json({ error: "Failed to save city" });
  }
});

// Get recent 5 cities
router.get("/", async (req, res) => {
  try {
    const cities = await City.find()
      .sort({ searchedAt: -1 })
      .limit(5);
    res.json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ error: "Failed to fetch cities" });
  }
});

module.exports = router;
