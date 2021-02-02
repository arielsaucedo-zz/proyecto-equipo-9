const express = require('express');
const router = express.Router();

const apiUsersController = require('../../controllers/api/usersController');

router.get("/", apiUsersController.showAll)
<<<<<<< HEAD:routes/api/users.js
/* router.get("/:id", apiUsersController.find) */
=======
router.get("/:id",apiUsersController.find)
>>>>>>> df9740da0fde71a402eae00ed4f05ddc9db5c15b:routes/api/usersRouter.js

module.exports = router;