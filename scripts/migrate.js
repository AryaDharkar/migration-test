const { MongoClient } = require("mongodb");

async function migrate() {
  // Use env vars directly - no dotenv needed on Vercel
  const mongoUri = process.env.MONGO_URI;
  const dbName = process.env.DB_NAME;

  console.log("🚀 Migration script started");
  console.log("MONGO_URI exists:", !!mongoUri);
  console.log("DB_NAME:", dbName);

  if (!mongoUri || !dbName) {
    console.error("❌ Missing env variables!");
    process.exit(1);
  }

  const client = new MongoClient(mongoUri);
  try {
    console.log("📡 Connecting to MongoDB...");
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(dbName);

    const count = await db.collection("subscriptions").countDocuments({});
    console.log(`📊 Found ${count} documents in subscriptions`);

    const result = await db
      .collection("subscriptions")
      .updateMany({}, { $set: { startDate: new Date(), endDate: null } });

    console.log(
      `✅ Matched: ${result.matchedCount}, Updated: ${result.modifiedCount}`,
    );
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await client.close();
    console.log("🔌 Disconnected from MongoDB");
  }
}

migrate();
