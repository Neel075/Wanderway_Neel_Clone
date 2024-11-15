const express = require("express");
const multer = require("multer");
const User = require("../models/user");
const router = express.Router();
const { getUserProfile, setUserProfile, userUpdate,userSignIn,userSignUp } = require("../controllers/user");
const { checkForAuthentication } = require("../middlewares/auth");
const { createHmac, randomBytes } = require("crypto");

router.get("/myProfile",checkForAuthentication,getUserProfile);
router.post("/edit",setUserProfile);


router.post("/signup", userSignUp);

router.post("/signin", userSignIn);

/* ------------------------------------------------------------------------------------ */

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `public/uploads/`); // Specify your upload directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Rename the file
    }
});

const upload = multer({ storage: storage });

// PUT request to update user information
router.post("/update", upload.single('profileImage'), userUpdate);

module.exports = router;