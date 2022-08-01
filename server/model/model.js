const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique: true
    },
    gender : String,
    status : String
});
const User = mongoose.model('User', Schema);
module.exports = User;