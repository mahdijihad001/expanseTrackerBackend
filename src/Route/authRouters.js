const express = require("express");
const { registerUser, loginUser, getUserInfo } = require("../Controllers/authController");
const { protect } = require("../Middleware/AuthMiddleware");
const upload = require("../Middleware/uploadMiddleware");


const authRouter = express.Router();

authRouter.post('/register' , registerUser);
authRouter.post("/login" , loginUser);
authRouter.get('/getuserinfo' , protect , getUserInfo);

// authRouter.post("/upload-image", upload.single("image"), (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

    
//     const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

//     res.status(201).json({ imageUrl });
//   } catch (error) {
//     console.error("Upload error:", error);
//     res.status(500).json({ message: "File upload failed", error: error.message });
//   }
// });

module.exports = authRouter;