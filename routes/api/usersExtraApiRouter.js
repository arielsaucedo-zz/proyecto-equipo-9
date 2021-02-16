const express = require('express');
const router = express.Router();

const usersExtraApiController = require('../../controllers/api/usersExtraApiController');

router.get('/', usersExtraApiController.showAllExtra)
router.get('/lastUserDB', usersExtraApiController.lastUserDB)

module.exports = router;