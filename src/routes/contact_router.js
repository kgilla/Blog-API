const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact_controller");

router.post("/create", contactController.createPost);
router.get("/", contactController.indexGet);
router.get("/:id", contactController.contactViewGet);
router.post("/:id/delete", contactController.deletePost);

module.exports = router;
