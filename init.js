require('dotenv').config(); 
const mongoose = require('mongoose');
const Permission = require('./models/Permission');

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        await Permission.collection.dropIndexes();
        console.log("Old indexes dropped successfully!");

        await Permission.deleteMany({});
        console.log("Existing permission data deleted!");

        await Permission.insertMany([{ description: "admin" }, { description: "regular_user" }]);
        console.log("New permission data inserted successfully!");

        mongoose.connection.close(); 
    })
    .catch(err => console.error(err));