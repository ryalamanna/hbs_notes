
var mongoose = require('mongoose');

let dbInstance = undefined;

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.DB);
        dbInstance = connectionInstance;
        console.log(`Mongo db connected to host : ${connectionInstance.connection.host} `);
        return 'yes';
    } catch (error) {
        console.log('MOngo db connection Error' , error);
        process.exit(1);
    }
}

module.exports = connectDB;