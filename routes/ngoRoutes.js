const express = require("express");
const router = express.Router();
const { registerNgo, loginNgo, listNgos, broadcastMessage } = require("../controllers/ngoController");

router.post("/register", registerNgo);
router.post("/login", loginNgo);

// fetch list of ngos (public)
router.get("/list", listNgos);

// broadcast message to all ngos (no auth yet)
router.post("/broadcast", broadcastMessage);

module.exports = router;