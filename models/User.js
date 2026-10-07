const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : {type:String, required: true, unique:true},
    password: {type:String, required:true},
    firstname : {type:String, required:true},
    lastname: {type:String,required:true},

    permission : {type:String, enum:['admin','regular_user'],default:'regular_user'},

    comments: [{ type:mongoose.Schema.Types.ObjectId, ref:'Comment'}]
},{
    timestamps: {createdAt: 'created', updatedAt:'updated'}
});

module.exports = mongoose.model('User',userSchema);