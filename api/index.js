const express = require("express");
const mongoose = require("mongoose");
const Subscription = require("../models/Subscription");
require("dotenv").config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

// Create a subscription
app.post("/subscriptions", async (req, res) => {
  const sub = await Subscription.create(req.body);
  res.json(sub);
});

// Get all subscriptions
app.get("/subscriptions", async (req, res) => {
  const subs = await Subscription.find();
  res.json(subs);
});

module.exports = app;
