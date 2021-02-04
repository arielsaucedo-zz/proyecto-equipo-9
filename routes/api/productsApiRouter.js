const express = require('express');
const router = express.Router();

const apiProductsController = require('../../controllers/api/productsApiController');

<<<<<<< HEAD
/* router.get("/", apiProductsController.showAll)
router.get("/:id", apiProductsController.find) */


=======
router.get('/', apiProductsController.showAll)
router.get('/:id', apiProductsController.find)
>>>>>>> 2aeec7b7cace520c670647519d200accfe624725

module.exports = router;