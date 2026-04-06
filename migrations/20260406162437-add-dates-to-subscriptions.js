module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db) {
    // Debug: Check the collection and database
    const dbName = db.getName();
    console.log(`Database: ${dbName}`);

    const collections = await db.listCollections().toArray();
    console.log(
      `Collections:`,
      collections.map((c) => c.name),
    );

    // Check what's in subscriptions
    const count = await db.collection("subscriptions").countDocuments({});
    console.log(`Total documents in subscriptions: ${count}`);

    const sample = await db.collection("subscriptions").findOne({});
    console.log(`Sample document:`, sample);

    // Now do the update
    const result = await db.collection("subscriptions").updateMany(
      {}, // Match ALL documents first
      { $set: { startDate: new Date(), endDate: null } },
    );
    console.log(`Migrated ${result.modifiedCount} documents`);
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db) {
    await db
      .collection("subscriptions")
      .updateMany({}, { $unset: { startDate: "", endDate: "" } });
  },
};
