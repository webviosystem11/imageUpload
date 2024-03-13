const mongoose = require('mongoose')
require('dotenv').config();

const url = process.env.DB_PASSWORD || "mongodb://127.0.0.1:27017";

module.exports.connect = () =>{
    mongoose.set('strictQuery', false);
    mongoose.connect(url).then((res) =>

     console.log("Db connection successfully")).catch((err)=> console.log('Error:-',err))
}