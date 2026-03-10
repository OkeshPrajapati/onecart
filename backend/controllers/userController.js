import UserModel from "../models/userModal.js"

export const getCurrentUser = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await UserModel.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "getCurrentUser error",
    });
  }
};


export const getAdmin = async (req, res) => {
  try {
    const adminEmail = req.user?.email;  // safer

    if (!adminEmail) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      email: adminEmail,
      role: "admin",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "getAdmin error",
    });
  }
};