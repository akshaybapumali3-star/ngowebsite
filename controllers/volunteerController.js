const Volunteer = require("../models/volunteerModel");

// Create a new volunteer request (user side)
exports.createVolunteer = async (req, res) => {
  try {
    const { userId, ngoId, name, email, age, address, mobile, skills, preferences } = req.body;
    if (!userId || !ngoId || !name || !email || !age || !address || !mobile || !skills) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRequest = new Volunteer({
      user: userId,
      ngo: ngoId,
      name,
      email,
      age,
      address,
      mobile,
      skills,
      preferences: preferences || "",
    });

    const saved = await newRequest.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get all volunteer requests linked to an NGO
exports.getVolunteersByNgo = async (req, res) => {
  try {
    const ngoId = req.params.ngoId;
    const list = await Volunteer.find({ ngo: ngoId })
      .populate("user", "name email mobile address skills age")
      .populate("ngo", "name")
      .sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get all volunteer requests linked to a User
exports.getVolunteersByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const list = await Volunteer.find({ user: userId })
      .populate("ngo", "name address")
      .populate("user", "name age address mobile")
      .sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Update status of a volunteer request (accept/reject) + optional message
exports.updateStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status, message } = req.body;
    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updated = await Volunteer.findByIdAndUpdate(
      id,
      { status, ...(message && { message }) },
      { new: true }
    )
      .populate("user", "name email mobile")
      .populate("ngo", "name email");

    if (!updated) return res.status(404).json({ message: "Request not found" });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};