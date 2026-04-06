const { Schema, model } = require("mongoose");

// models/Subscription.js
const subscriptionSchema = new Schema({
  userId: { type: String, required: true },
  plan: { type: String, required: true },
  startDate: { type: Date, default: null }, // optional for now
  endDate: { type: Date, default: null },
});

module.exports = model("Subscription", subscriptionSchema);
