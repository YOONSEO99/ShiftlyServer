const express = require('express');
const router = express.Router();
const shiftController = require('../controllers/shiftController');

router.get('/', shiftController.getAllShifts);
router.post('/',shiftController.addShift);
router.get('/:id',shiftController.getShiftById);
router.patch('/:id',shiftController.updateShiftById);
router.delete('/:id', shiftController.deleteShift);

module.exports = router;