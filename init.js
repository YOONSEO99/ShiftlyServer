const mongoose = require('mongoose');
const Permission = require('./models/Permission');

mongoose.connect('mongodb://127.0.0.1:27017/shiftly')
    .then(async () => {
        await Permission.insertMany([{ name: "admin" }, { name: "regular_user" }]);
        console.log("finished successfully!");
        mongoose.connection.close(); 
    })
    .catch(err => console.error(err));