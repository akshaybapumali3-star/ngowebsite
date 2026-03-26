const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");
const Ngo = require("../models/ngoModel");
const nodemailer = require("nodemailer");
const multer = require("multer");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

// --------------------
// FILE UPLOAD (MULTER)
// --------------------
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// --------------------
// EMAIL CONFIG
// --------------------
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ==================================================
// CREATE COMPLAINT
// ==================================================
router.post("/create", upload.single("photo"), async (req, res) => {
  try {
    const uniqueId = "CMP" + Date.now();
    let photoHash = null;

    // Duplicate detection using photo hash
    if (req.file) {
      const buffer = fs.readFileSync(req.file.path);
      photoHash = crypto.createHash("md5").update(buffer).digest("hex");
      const existing = await Complaint.findOne({ photoHash });
      if (existing) {
        return res.json({
          success: false,
          duplicate: true,
          complaintId: existing.complaintId
        });
      }
    }

    // Save complaint
    const complaint = new Complaint({
      ...req.body,
      complaintId: uniqueId,
      photoHash,
      photoFilename: req.file ? req.file.filename : null,
      status: "Pending",
      assignedNgo: null,
      location: {
        lat: req.body.lat,
        lng: req.body.lng
      }
    });

    await complaint.save();

    // Email notification
    if (req.body.email) {
      try {
        await transporter.sendMail({
          to: req.body.email,
          subject: "Complaint Registered Successfully",
          text: `Your complaint has been registered.\nComplaint ID: ${uniqueId}`
        });
      } catch (emailErr) {
        console.log("Email sending failed:", emailErr.message);
      }
    }

    res.json({
      success: true,
      complaintId: uniqueId
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// ==================================================
// GET ALL COMPLAINTS (FOR NGO REPORT CHILD PAGE)
// ==================================================
router.get("/all", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json({ success: true, data: complaints });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================================================
// TRACK COMPLAINT (BY ID ONLY)
// ==================================================
router.post("/track", async (req, res) => {
  try {
    const { complaintId } = req.body;
    if (!complaintId) return res.json({ success: false, message: "Complaint ID required" });

    const data = await Complaint.findOne({ complaintId });
    if (!data) return res.json({ success: false, message: "Complaint not found" });

    let ngoDetails = null;
    if (data.assignedNgo) {
      const ngo = await Ngo.findOne({ name: data.assignedNgo });
      if (ngo) {
        ngoDetails = {
          name: ngo.name,
          contact: ngo.contact,
          address: ngo.address,
          email: ngo.email
        };
      }
    }

    res.json({
      success: true,
      data: {
        complaintId: data.complaintId,
        status: data.status,
        ngo: data.assignedNgo,
        ngoDetails: ngoDetails,
        location: data.location,
        description: data.description
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================================================
// ACCEPT COMPLAINT (NGO)
// ==================================================
router.post("/accept", async (req, res) => {
  try {
    const { complaintId, ngoName } = req.body;
    if (!complaintId || !ngoName) return res.json({ success: false, message: "complaintId and ngoName required" });

    const complaint = await Complaint.findOne({ complaintId });
    if (!complaint) return res.json({ success: false, message: "Complaint not found" });

    if (complaint.status === "Accepted") {
      return res.json({ success: false, message: "Already accepted by another NGO" });
    }

    complaint.status = "Accepted";
    complaint.assignedNgo = ngoName;
    complaint.assignedAt = new Date();

    await complaint.save();

    // Send email to complainant with NGO details
    if (complaint.email) {
      try {
        const ngo = await Ngo.findOne({ name: ngoName });
        let ngoInfo = `NGO: ${ngoName}`;
        if (ngo) {
          ngoInfo += `\nContact: ${ngo.contact}\nAddress: ${ngo.address}\nEmail: ${ngo.email}`;
        }

        await transporter.sendMail({
          to: complaint.email,
          subject: "Your Complaint Has Been Accepted",
          text: `Your complaint (ID: ${complaintId}) has been accepted by ${ngoInfo}\n\nPlease contact the NGO for further assistance.`
        });
      } catch (emailErr) {
        console.log("Email sending failed:", emailErr.message);
      }
    }

    res.json({ success: true, message: "Complaint accepted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================================================
// REJECT COMPLAINT (NGO)
// ==================================================
router.post("/reject", async (req, res) => {
  try {
    const { complaintId, ngoName } = req.body;
    if (!complaintId || !ngoName) return res.json({ success: false, message: "complaintId and ngoName required" });

    const complaint = await Complaint.findOne({ complaintId });
    if (!complaint) return res.json({ success: false, message: "Complaint not found" });

    if (complaint.status === "Rejected") {
      return res.json({ success: false, message: "Already rejected" });
    }

    complaint.status = "Rejected";
    complaint.assignedNgo = ngoName; // still assign for tracking
    complaint.rejectedAt = new Date();

    await complaint.save();

    res.json({ success: true, message: "Complaint rejected" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================================================
// UPDATE COMPLAINT STATUS (NGO)
// ==================================================
router.post("/update-status", async (req, res) => {
  try {
    const { complaintId, status } = req.body;
    if (!complaintId || !status) return res.json({ success: false, message: "complaintId and status required" });

    const complaint = await Complaint.findOne({ complaintId });
    if (!complaint) return res.json({ success: false, message: "Complaint not found" });

    // Only allow status updates for accepted complaints
    if (complaint.status !== "Accepted") {
      return res.json({ success: false, message: "Can only update status of accepted complaints" });
    }

    complaint.status = status;
    complaint.updatedAt = new Date();

    await complaint.save();

    // Send email notification for resolution
    if (status === "Resolved" && complaint.email) {
      try {
        const ngo = await Ngo.findOne({ name: complaint.assignedNgo });
        let ngoInfo = complaint.assignedNgo;
        if (ngo) {
          ngoInfo += ` (Contact: ${ngo.contact})`;
        }

        await transporter.sendMail({
          to: complaint.email,
          subject: "Your Complaint Has Been Resolved",
          text: `Your complaint (ID: ${complaintId}) has been successfully resolved by ${ngoInfo}.\n\nThank you for helping protect children.`
        });
      } catch (emailErr) {
        console.log("Resolution email failed:", emailErr.message);
      }
    }

    res.json({ success: true, message: `Status updated to ${status}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;