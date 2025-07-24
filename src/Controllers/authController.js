const jwt = require("jsonwebtoken");
const userModel = require("../Models/User");


const genarateJwt = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRAT, { expiresIn: "24h" });
}

// Register user
exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImage } = req.body;

    if (!fullName, !email, !password) {
        return res.status(400).json({ message: "All filds are required", success: false });
    };

    try {
        // Checking user
        const exixtingUser = await userModel.findOne({ email: email });

        if (exixtingUser) {
            return res.status(400).json({ message: "Email already in use", success: false });
        };

        // Create user

        const user = await userModel.create({ fullName, email, password, profileImage });


         const token = genarateJwt(user?._id);

        const option = {
            httpOnly: true,
            secure: false,     
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000
        }

        res.cookie("token", token , option);

        res.status(201).json({
            id: user?._id,
            user,
            token
        })

    } catch (error) {
        res.status(500).json({ message: "Error registaring user", error: error?.message })
    }

};

// Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All filds are required." });
    };

    try {
        const user = await userModel.findOne({ email });

        if (!user || !(await user.compairePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        };

        const token = genarateJwt(user?._id);

        const option = {
            httpOnly: true,
            secure: false,     
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000
        }

        res.cookie("token", token , option);
        res.status(200).json({ id: user?._id, user, token});

    } catch (error) {
        res.status(500).json({ message: "Error login user", error: error?.message })
    }

}
// Get User Info
exports.getUserInfo = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found." })
        };

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: "Error Not found user", error: error?.message })
    }
}