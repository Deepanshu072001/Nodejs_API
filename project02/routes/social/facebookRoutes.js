const express = require("express");
const router = express.Router();
const facebookController = require("../../controllers/social/facebookController");

router.post("/list", facebookController.addFacebook);
router.get("/list", facebookController.getAllFacebook);
router.get("/list/:username", facebookController.getFacebook);
router.put("/list/:username", facebookController.updateFacebook);
router.delete("/list", facebookController.deleteAllFacebook);
router.delete("/list/:username", facebookController.deleteFacebook);

module.exports = router;
