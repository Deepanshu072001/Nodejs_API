const express = require("express");
const router = express.Router();
const mobilesController = require("../controllers/mobilesController");

router.post("/list", mobilesController.addMobiles);
router.get("/list", mobilesController.getAllMobiles);
router.get("/list/:ph_name", mobilesController.getMobile);
router.put("/list/:ph_name", mobilesController.updateMobile);
router.delete("/list", mobilesController.deleteAllMobiles);
router.delete("/list/:ph_name", mobilesController.deleteMobile);

module.exports = router;
