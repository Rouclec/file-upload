const express = require("express");
const {
  login,
  signup,
  protect,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/signup", signup);
router.patch("/reset-password/:token", resetPassword);

router.use(protect); //every route below this line, will pass through the protect middleware first

module.exports = router;
