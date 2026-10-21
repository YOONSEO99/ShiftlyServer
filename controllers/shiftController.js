const Shift = require('../models/Shift');
const auth = require('./authController');

exports.getAllShifts = async (req, res) => {
    try {
        if (!auth.isAdmin(req)) {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }

        const shifts = await Shift.find();
        res.json(shifts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getShiftById = async (req, res) => {
    try {
        const shift = await Shift.findById(req.params.id);
        if (!shift) return res.status(404).json({ message: 'Shift not found' });
        res.json(shift);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateShiftById = async (req, res) => {
    try {
        const { shift } = req.body;

        const updatedShift = await Shift.findByIdAndUpdate(
            req.params.id,
            shift || req.body,
            { new: true }
        );
        if (!updatedShift) return res.status(404).json({ message: 'Shift not found' });
        res.json(updatedShift);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteShift = async (req, res) => {
    try {
        if (!auth.isAdmin(req)) {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }

        const deletedShift = await Shift.findByIdAndDelete(req.params.id);
        if (!deletedShift) return res.status(404).json({ message: 'Shift not found' });
        res.json({ message: 'Shift deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addShift = async (req, res) => {
    try {
        const { shift } = req.body;
        const shiftData = shift || req.body;

        const existingShift = await Shift.findOne({
            userId: shiftData.userId,
            start: shiftData.start,
            end: shiftData.end
        });

        if (existingShift) {
            return res.status(400).json({ message: 'This shift already exists.' });
        }

        const newShift = new Shift(shiftData);
        const savedShift = await newShift.save();
        res.status(201).json(savedShift);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};