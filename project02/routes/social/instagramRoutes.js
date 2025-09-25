const express = require("express");
const router = express.Router();
const instagramController = require("../../controllers/social/instagramController");

router.post("/list", instagramController.addInstagram);
router.get("/list", instagramController.getAllInstagram);
router.get("/list/:username", instagramController.getInstagram);
router.put("/list/:username", instagramController.updateInstagram);
router.delete("/list", instagramController.deleteAllInstagram);
router.delete("/list/:username", instagramController.deleteInstagram);

module.exports = router;
