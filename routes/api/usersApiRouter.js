const express = require('express');
const router = express.Router();

const apiUsersController = require('../../controllers/api/usersApiController');

router.get("/", apiUsersController.showAll)
router.get("/:id",apiUsersController.find)

module.exports = router;