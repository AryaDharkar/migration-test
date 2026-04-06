module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db) {
    const result = await db
      .collection("subscriptions")
      .updateMany(
        { startDate: { $exists: false } },
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
