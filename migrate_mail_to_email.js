require('dotenv').config();
const mongoose = require('mongoose');

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for migration');

    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');

    // 1. Drop the old index if it exists
    try {
      await usersCollection.dropIndex('mail_1');
      console.log('Dropped index: mail_1');
    } catch (err) {
      if (err.codeName === 'IndexNotFound') {
        console.log('Index mail_1 not found, skipping drop.');
      } else {
        console.error('Error dropping index mail_1:', err);
      }
    }

    // 2. Update all documents: rename 'mail' to 'email' if 'mail' exists
    const updateResult = await usersCollection.updateMany(
      { mail: { $exists: true } },
      { $rename: { mail: 'email' } }
    );
    console.log(`Matched ${updateResult.matchedCount} documents, modified ${updateResult.modifiedCount} documents.`);

    console.log('Migration complete.');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
}

migrate();
