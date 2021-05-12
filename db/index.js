const mongoose = require("mongoose")
require ("dotenv").config()
const { MONGO_URI } = process.env;


// Create a Connection Function 

// const connectDB = () => {
//     mongoose.connect(MONGO_URI, {
//        useNewUrlParser: true,
//        useUnifiedTopology: true,
//        useFindAndModify: false 
//     }, (err) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log('Database connected');
//     });
// };

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log("MongoDB database created...")
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }

}

module.exports = connectDB;