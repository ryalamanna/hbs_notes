
var mongoose = require('mongoose');

let dbInstance = undefined;

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect('mongodb+srv://ryalamanna:n9X8QqojvsgBGCWu@cluster0.ycs2cg0.mongodb.net/my_notes');
        dbInstance = connectionInstance;
        console.log(`Mongo db connected to host : ${connectionInstance.connection.host} `);
        return 'yes';
    } catch (error) {
        console.log('MOngo db connection Error' , error);
        process.exit(1);
    }
}

module.exports = connectDB;