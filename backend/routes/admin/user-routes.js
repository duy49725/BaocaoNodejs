const express = require('express');
const router = express.Router();
const {getAllUser, updateUserActiveStatus, deleteUser, createUser} = require('../../controllers/admin/user-controller');

router.get('/get', getAllUser);
router.post('/create', createUser);
router.patch('/active/:id', updateUserActiveStatus);
router.delete('/delete/:id', deleteUser);

module.exports = router;