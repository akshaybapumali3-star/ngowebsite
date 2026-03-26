const Ngo = require("../models/ngoModel");
const jwt = require("jsonwebtoken");

// --------------------
// NGO REGISTER
// --------------------
exports.registerNgo = async (req, res) => {
  try {
    let { name, email, password, contact, address, description } = req.body;

    // ✅ normalize email
    email = String(email).toLowerCase().trim();

    const existingNgo = await Ngo.findOne({ email });
    if (existingNgo) {
      return res.status(400).json({ message: "NGO already exists" });
    }

    const ngoId = Math.floor(1000000000 + Math.random() * 9000000000);

    const newNgo = new Ngo({
      ngoId,
      name,
      email,
      password: String(password).trim(),
      contact,
      address,
      description
    });

    await newNgo.save();

    res.status(201).json({
      message: "NGO Registered Successfully ✅",
      ngoId
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// --------------------
// NGO LOGIN (FINAL FIX 🔥)
// --------------------
exports.loginNgo = async (req, res) => {
  try {
    let { email, password } = req.body;

    // ✅ normalize
    email = String(email).toLowerCase().trim();
    password = String(password).trim();

    console.log("LOGIN TRY:", email, password);

    const ngo = await Ngo.findOne({ email });

    console.log("FOUND NGO:", ngo);

    if (!ngo) {
      return res.status(400).json({ message: "Invalid Email ❌" });
    }

    if (String(ngo.password).trim() !== password) {
      return res.status(400).json({ message: "Invalid Password ❌" });
    }

    const token = jwt.sign(
      { id: ngo._id, role: "ngo" },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    res.json({
      message: "NGO Login Successful ✅",
      token,
      ngo: {
        id: ngo._id,
        name: ngo.name,
        email: ngo.email,
        ngoId: ngo.ngoId
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// --------------------
// LIST NGOs
// --------------------
exports.listNgos = async (req, res) => {
  try {
    const ngos = await Ngo.find({}, "name ngoId");
    res.json(ngos);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


// --------------------
// BROADCAST MESSAGE
// --------------------
exports.broadcastMessage = async (req, res) => {
  try {
    const { subject, body } = req.body;

    if (!subject || !body) {
      return res.status(400).json({ message: "Subject and body required" });
    }

    const ngos = await Ngo.find({}, "email name");

    ngos.forEach((n) => {
      console.log(`Broadcast to ${n.email} (${n.name}): ${subject}`);
    });

    res.json({ message: `Message broadcasted to ${ngos.length} NGOs` });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};