const User =  require("../models/userModel");
const bcrypt = require("bcryptjs");


exports.getProfile = async (req,res) =>{
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current password" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(newPassword, salt);

    // Save new password
    user.password = hashedPass;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.updateProfile = async (req,res) =>{
    const {name,email} = req.body;

    const updateUser = await User.findByIdAndUpdate(
        req.user.id,
        {name,email},
        {new: true}
    ).select("-password");

    res.json(updateUser);


}