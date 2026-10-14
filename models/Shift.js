const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, ref:'User',required:true},
    start: {type:String,required:true},
    end: {type:String, required:true},
    perHour: {type:Number, required:true},
    place:{type:String, required:true}
}, {
    timestamps: {createdAt:'created', updatedAt:'updated'}
});

module.exports = mongoose.model('Shift', shiftSchema);