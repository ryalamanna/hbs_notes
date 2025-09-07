const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Note = require('./models/notes.models');
const User = require('./models/user.models');

async function main() {
  await mongoose.connect(process.env.DB);

  // 1. Create a user (change username/password as needed)
  let user = await User.findOne({ username: 'admin' });
  if (!user) {
    user = await User.create({ username: 'ryal_rafter', password: 'admin123' });
    console.log('Created user:', user.username);
  } else {
    console.log('User already exists:', user.username);
  }

  // 2. Assign all notes to this user
  const result = await Note.updateMany(
    { userId: { $exists: false } }, // Only notes without userId
    { $set: { userId: user._id } }
  );
  console.log(`Updated ${result.modifiedCount} notes.`);

  mongoose.connection.close();
}

main();