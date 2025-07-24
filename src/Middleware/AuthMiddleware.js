const jwt = require("jsonwebtoken");
const userModel = require("../Models/User");

exports.protect = async (req, res, next) => {
    // let token = req.headers.authorization?.split(" ")[1];
    // 1:13 munite
    let token = req.cookies?.token;
    
    if (!token) return res.status(401).json({ message: "Not authorized , Not token" });


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRAT);

        req.id = decoded.id;
        req.user = await userModel.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        res.status(401).json({ message: "Not authorized , Token failed" });
    }

}