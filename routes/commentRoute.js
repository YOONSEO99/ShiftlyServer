const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/',commentController.getAllComments);
router.post('/',commentController.createComment);

router.get('/user/:userId',commentController.getAllUserComments);

router.get('/:id',commentController.getCommentById);
router.patch('/:id',commentController.updateCommentById);
router.delete('/:id',commentController.deleteComment);

module.exports = router;