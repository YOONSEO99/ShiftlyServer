const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require('./authController');

exports.getAllUsers = async (req, res) => {
    try {
        if (!auth.isAdmin(req)) {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const userData = req.body.user || req.body;
        
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);

        const newUser = new User(userData);
        const savedUser = await newUser.save();

        const userResponse = savedUser.toObject();
        delete userResponse.password;

        res.status(201).json(userResponse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUserById = async (req, res) => {
    try {
        const userData = req.body.user || req.body;

        if (userData.password) {
            const salt = await bcrypt.genSalt(10);
            userData.password = await bcrypt.hash(userData.password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            userData,
            { new: true }
        ).select('-password');

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'No token provided' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.permission !== 'admin' && decoded._id !== req.params.id) {
            return res.status(403).json({ message: 'Access denied.' });
        }

        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { _id: user._id, permission: user.permission },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        const userResponse = user.toObject();
        delete userResponse.password;

        res.json({ token, user: userResponse });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};