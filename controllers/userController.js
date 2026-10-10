const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async(req,res)=>{
    try{
        const {user} = req.body;

        if (!user || user.permission !== 'admin'){
            return res.status(403).json({message : 'Access denied. Admin only.'});
        }

        const users = await User.find();
        res.json(users);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

exports.createUser = async (req,res)=>{
    try{
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch(error){
        res.status(400).json({message:error.message});
    }
};

exports.getUserById = async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({message: 'User not found'});
        res.json(user);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

exports.updateUserById = async (req,res) => {
    try{

        const {user} = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            user || req.body,
            {new:true}
        );
        if(!updatedUser) return res.status(404).json({message: 'User not found'});
        res.json(updatedUser);
    }catch(error){
        res.status(400).json({message:error.message});
    }
}

exports.deleteUser = async(req,res)=>{
    try{
        const {user} = req.body;

        if (!user || (user.permission !== 'admin' && user._id !== req.params.id)){
            return res.status(403).json({message: 'Access denied. You can only delete your own account unless you are an admin'});
        }

        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if(!deletedUser) return res.status(404).json({message:'User not found'});
        res.json({message: 'User deleted successfully'});
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

exports.login = async (req, res)=>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message: 'User not found'});

        if(user.password !== password){
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const token = jwt.sign(
            {_id:user._id, permission : user.permission},
            'shiftly_secret',
            {expiresIn: '1h'}
        );

        res.json({token, user});
    }catch(error){
        res.status(500).json({message: error.message});
    }
};