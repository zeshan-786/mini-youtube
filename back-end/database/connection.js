//require mongoose module
const mongoose = require('mongoose');

//require chalk module to give colors to console text
const chalk = require('chalk');

const defaultDb = `mongodb://localhost:27017/mini_youtube`
const dbURL = process.env.DB_URL ? process.env.DB_URL : defaultDb

// Setting colors for messages
const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;

module.exports = {
    connectMongodb : () =>{
        mongoose.connect(dbURL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        mongoose.connection.on('connected', function(){
            console.log(connected("Mongoose default connection is open to",dbURL));
        });

        mongoose.connection.on('error', function(err){
            console.log(error("Mongoose default connection has occured "+err+" error"));
        });

        mongoose.connection.on('disconnected', function(){
            console.log(disconnected("Mongoose default connection is disconnected"));
        });

        process.on('SIGINT', function(){
            mongoose.connection.close(function(){
                console.log(termination("Mongoose default connection is disconnected due to application termination"));
                process.exit(0)
            });
        });
    }
}