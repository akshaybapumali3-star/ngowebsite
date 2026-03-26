const express = require("express");
const multer = require("multer");
const router = express.Router();
const { addProduct, getProducts } = require("../controllers/productController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/", upload.single('image'), addProduct);
router.get("/", getProducts);

module.exports = router;