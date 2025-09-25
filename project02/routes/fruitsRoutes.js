const express = require('express');
const router = express.Router();
const fruitsController = require("../controllers/fruitsController");

router.post("/", fruitsController.addFruit);
router.get("/", fruitsController.getAllFruits);
router.get("/:name", fruitsController.getFruit);
router.put("/:name", fruitsController.updateFruit);
router.delete("/:name", fruitsController.deleteFruit);

module.exports = router;
