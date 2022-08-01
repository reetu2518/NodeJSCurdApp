const mongoose = require("mongoose");

// console.log(process.env.MONGO_URL, "URL");

const connectDB = async () => {
    try {
        const con = mongoose.connect(process.env.MONGO_URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true
        })

        console.log(`Mongo DB connected`);
        // console.log(`Mongo DB connected ${con.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;