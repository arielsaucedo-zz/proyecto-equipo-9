const express = require('express');
const router = express.Router();

const apiUsersController = require('../../controllers/api/usersController');

router.get("/", apiUsersController.showAll)
router.get("/:id",apiUsersController.find)

module.exports = router;