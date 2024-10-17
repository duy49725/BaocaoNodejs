const express = require('express');
const {getOverviewData} = require('../../controllers/admin/dashboard-controller');
const router = express.Router();

router.get('/get', getOverviewData);

module.exports = router;