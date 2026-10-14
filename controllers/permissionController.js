const Permission = require('../models/Permission');

exports.getAllPermissions = async (req,res)=>{
    try{
        const permissions = await Permission.find();
        res.json(permissions);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};