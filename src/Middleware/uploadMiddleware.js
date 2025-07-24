// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");


// const uploadDirectory = path.join(__dirname, "../uploads");
// if (!fs.existsSync(uploadDirectory)) {
//   fs.mkdirSync(uploadDirectory, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDirectory); 
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   const allowTypes = ["image/jpeg", "image/png", "image/jpg"];
//   if (allowTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only .jpeg, .png & .jpg formats are allowed"), false);
//   }
// };

// const upload = multer({ storage, fileFilter });

// module.exports = upload;