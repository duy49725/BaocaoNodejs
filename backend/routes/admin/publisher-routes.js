const express = require('express');
const {addPublisher, fetchAllPublisher, fetchPublisher, editPublisher, deletePublisher} = require('../../controllers/admin/publisher-controller');
const router = express.Router();

router.post('/add',addPublisher);
router.put('/edit/:id', editPublisher);
router.delete('/delete/:id', deletePublisher);
router.get('/get', fetchAllPublisher);
router.get('/getpublisher', fetchPublisher);

module.exports = router;