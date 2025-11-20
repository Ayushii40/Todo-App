const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {getProfile , changePassword, updateProfile} = require("../controllers/userController");

router.get("/profile", authMiddleware,getProfile);
router.put("/change-password", authMiddleware, changePassword);
router.put("/profile/update", authMiddleware, updateProfile);


module.exports = router;