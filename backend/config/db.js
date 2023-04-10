const mongoose = require('mongoose');

const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser : true,
            useUnifiedTopology: true,
            // useFindOneAndUpdate : true,
        });
        console.log(`MongoDB Database  connected: ${conn.connection.host}`.blue.underline);
    }
    catch(error) {
        console.log(`Database Error : ${error.message}`.red.bold.underline);
        process.exit();
    }
};

module.exports = connectDB;