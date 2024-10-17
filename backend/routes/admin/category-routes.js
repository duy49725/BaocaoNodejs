const express = require('express');
const {addCategory, fetchAllCategory, fetchCategory, editCategory, deleteCategory} = require('../../controllers/admin/category-controller');
const router = express.Router();

router.post('/add',addCategory);
router.put('/edit/:id', editCategory);
router.delete('/delete/:id', deleteCategory);
router.get('/get', fetchAllCategory);
router.get('/getcategory', fetchCategory);

module.exports = router;