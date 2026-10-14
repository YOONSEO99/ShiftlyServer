const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    description: {type:String, required:true}
},{
    timestamps: {createdAt:'created', updatedAt:'updated'}
});

module.exports = mongoose.model('Comment', commentSchema);