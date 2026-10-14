const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    description: {type: String, required: true, unique:true}
});

module.exports = mongoose.model('Permission',permissionSchema);