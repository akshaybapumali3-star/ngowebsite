const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  role: String,

  childName: String,
  age: Number,
  gender: String,
  description: String,

  email: String,
  photoHash: String,
  photoFilename: String,

  location: {
    lat: Number,
    lng: Number
  },

  complaintId: String,

  status: {
    type: String,
    default: "Pending"
  },

  assignedNgo: {
    type: String,
    default: null
  },

  assignedAt: Date

}, { timestamps: true });

module.exports = mongoose.model("Complaint", complaintSchema);