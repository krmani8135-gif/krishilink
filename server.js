const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

const mandiPrices = [
  { crop: "Onion", mandi: "Lasalgaon", district: "Nashik", price: 1800, unit: "per quintal", date: "2026-09-11" },
  { crop: "Tomato", mandi: "Pune APMC", district: "Pune", price: 1200, unit: "per quintal", date: "2026-09-11" },
  { crop: "Soybean", mandi: "Latur", district: "Latur", price: 4200, unit: "per quintal", date: "2026-09-11" },
  { crop: "Cotton", mandi: "Jalna", district: "Jalna", price: 6800, unit: "per quintal", date: "2026-09-11" },
  { crop: "Wheat", mandi: "Aurangabad", district: "Aurangabad", price: 2300, unit: "per quintal", date: "2026-09-11" },
];

const cropListings = [
  { id: 1, farmerName: "Mani Kumar", crop: "Wheat", quantity: 40, location: "Patna, Bihar", expectedPrice: 2300, createdAt: new Date().toISOString(), phone: "6204739424" },
  { id: 2, farmerName: "Anand Kumar", crop: "Tomato", quantity: 25, location: "Patna, Bihar", expectedPrice: 1200, createdAt: new Date().toISOString(), phone: "6200630037" },
  { id: 3, farmerName: "Raja Kumar", crop: "Onion", quantity: 60, location: "Patna, Bihar", expectedPrice: 1800, createdAt: new Date().toISOString(), phone: "8298520079" },
  { id: 4, farmerName: "Mukul Kumar", crop: "Cotton", quantity: 30, location: "Patna, Bihar", expectedPrice: 6800, createdAt: new Date().toISOString(), phone: "7717709361" },
  { id: 5, farmerName: "Samrat Kumar", crop: "Soybean", quantity: 35, location: "Patna, Bihar", expectedPrice: 4200, createdAt: new Date().toISOString(), phone: "9264170275" },
]; // farmers post their crop lots here — pre-seeded with sample listings

// ------------------------------------------------------
// ROUTES
// ------------------------------------------------------

// 1. Get all mandi prices
app.get("/api/prices", (req, res) => {
  res.json(mandiPrices);
});

// 2. Get price for a specific crop
app.get("/api/prices/:crop", (req, res) => {
  const crop = req.params.crop.toLowerCase();
  const result = mandiPrices.filter(p => p.crop.toLowerCase() === crop);
  res.json(result);
});

// 3. Farmer posts a new crop lot (listing)
app.post("/api/listings", (req, res) => {
  const { farmerName, crop, quantity, location, expectedPrice } = req.body;

  if (!farmerName || !crop || !quantity || !location) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newListing = {
    id: cropListings.length + 1,
    farmerName,
    crop,
    quantity,
    location,
    expectedPrice: expectedPrice || null,
    createdAt: new Date().toISOString(),
  };

  cropListings.push(newListing);
  res.status(201).json(newListing);
});

// 4. Get all listings (for buyers to browse)
app.get("/api/listings", (req, res) => {
  res.json(cropListings);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
