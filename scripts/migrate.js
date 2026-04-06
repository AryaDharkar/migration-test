require("dotenv").config();
const { MongoClient } = require("mongodb");

async function migrate() {
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(process.env.DB_NAME);

    const result = await db
      .collection("subscriptions")
      .updateMany({}, { $set: { startDate: new Date(), endDate: null } });

    console.log(`✅ Updated ${result.modifiedCount} documents`);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

migrate();
