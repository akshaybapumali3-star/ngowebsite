const express = require("express");
const router = express.Router();
const {
  createVolunteer,
  getVolunteersByNgo,
  getVolunteersByUser,
  updateStatus,
} = require("../controllers/volunteerController");

// submit a new volunteer request
router.post("/", createVolunteer);

// list requests for a given ngo (could require auth middleware later)
router.get("/ngo/:ngoId", getVolunteersByNgo);

// list requests for a given user
router.get("/user/:userId", getVolunteersByUser);

// change status of a particular request
router.patch("/:id/status", updateStatus);

module.exports = router;
