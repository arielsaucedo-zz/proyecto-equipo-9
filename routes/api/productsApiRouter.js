const express = require('express');
const router = express.Router();

const apiProductsController = require('../../controllers/api/productsApiController');

router.get("/", apiProductsController.showAll)
router.get("/:id", apiProductsController.find)



module.exports = router;