const mongoose = require("mongoose");

const ngoSchema = new mongoose.Schema({
  ngoId: {
    type: String,
    unique: true
  },
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  contact: String,
  address: String,
  description: String
});

module.exports = mongoose.model("Ngo", ngoSchema);