const mongoose = require('mongoose');
const Note = require('./models/notes.models'); 

const dotenv = require('dotenv');
dotenv.config();

const dbUri = process.env.DB; 

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

const seedData = [
    {
        title: 'Sample Note 1',
        content: 'This is a sample note with **bold** text.',
        youtubeLinks: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
        references: ['https://www.example.com'],
        image: 'https://via.placeholder.com/150'
    },
    {
        title: 'Sample Note 2',
        content: 'Another note with _italic_ text and [a link](https://www.google.com).',
        youtubeLinks: [],
        references: ['https://www.google.com'],
        image: 'https://via.placeholder.com/150'
    }
];

const seedDB = async () => {
    try {
        await Note.deleteMany({}); 
        await Note.insertMany(seedData);
        console.log('Database seeded successfully!');
    } catch (err) {
        console.error('Error seeding the database:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
