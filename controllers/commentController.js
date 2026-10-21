const Comment = require('../models/Comment');
const User = require('../models/User'); 
const auth = require('./authController');

exports.getAllComments = async (req, res) => {
    try {
        if (!auth.isAdmin(req)) {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }
        const comments = await Comment.find();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        res.json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createComment = async (req, res) => {
    try {
        const { comment } = req.body;
        const newComment = new Comment(comment || req.body);
        const savedComment = await newComment.save();

        await User.findByIdAndUpdate(
            savedComment.userId,
            { $push: { comments: savedComment._id } }
        );

        res.status(201).json(savedComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateCommentById = async (req, res) => {
    try {
        const { comment } = req.body;
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            comment || req.body,
            { new: true }
        );
        if (!updatedComment) return res.status(404).json({ message: 'Comment not found' });
        res.json(updatedComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        if (!auth.isAdmin(req)) {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) return res.status(404).json({ message: 'Comment not found' });
        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllUserComments = async (req, res) => {
    try {
        const comments = await Comment.find({ userId: req.params.userId });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};