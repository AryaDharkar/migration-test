const { Schema, model } = require("mongoose");

const subscriptionSchema = new Schema({
  userId: { type: String, required: true },
  plan: { type: String, required: true },
  // startDate and endDate do not exist yet — this is the before state
});

module.exports = model("Subscription", subscriptionSchema);
