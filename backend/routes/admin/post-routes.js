const express = require('express');
const {create, deletepost, updatepost, getposts} = require('../../controllers/admin/post-controller');
const { authMiddleware } = require('../../controllers/auth/auth-controller');

const router = express.Router();

router.post('/create', authMiddleware, create);
router.get('/getposts', getposts);
router.delete('/deletepost/:postId/:userId', authMiddleware, deletepost);
router.put('/updatepost/:postId/:userId', authMiddleware, updatepost);

module.exports = router