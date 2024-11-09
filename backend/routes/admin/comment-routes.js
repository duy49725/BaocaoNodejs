const express = require('express');
const {createComment, deleteComment, editComment, likeComment, getComments, getPostComments} = require('../../controllers/admin/comment-controller');
const { authMiddleware } = require('../../controllers/auth/auth-controller');

const router = express.Router();

router.post('/create', authMiddleware, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment/:commentId', authMiddleware, likeComment);
router.put('/editComment/:commentId', authMiddleware, editComment);
router.delete('/deleteComment/:commentId', authMiddleware, deleteComment);
router.get('/getComments', authMiddleware, getComments);

module.exports = router;