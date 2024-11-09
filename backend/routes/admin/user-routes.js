const express = require('express');
const router = express.Router();
const {updateUser, getUser, getAllUser, updateUserActiveStatus, deleteUser, createUser} = require('../../controllers/admin/user-controller');
const { authMiddleware } = require('../../controllers/auth/auth-controller');

router.get('/get', getAllUser);
router.get('/getuser/:userId', getUser)
router.post('/create', createUser);
router.patch('/active/:id', updateUserActiveStatus);
router.delete('/delete/:id', deleteUser);
router.put('/update/:userId', authMiddleware, updateUser);

module.exports = router;