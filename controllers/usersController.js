const User = require("../models/User");
const { validationResult} = require("express-valdiator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config
const { SECRET } = process.env


// Routes          POST api/auth/login
// Description     Auth user(student, tutor and amdin) and get token.
// Access          Public route
exports.loginUser = async (req, res) => {
    // Check for Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    };
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ 
                statusCode: 400, 
                message: "Invalid credentials."
            })
        };
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                statusCode: 400,
                message: "Invalid Credentials"
            })
        };

        const payLoad = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payLoad,
            SECRET,
            {
                expiresIn: 86400
            }, (error, token) =>
            {
                if (error) {
                    throw error
                };
                res.json({
                    statusCode: 200,
                    message: "Logged in Successfully.",
                    user: {
                        firstName: user.firstName,
                        lastNAme: user.lastName,
                        email: user.email,
                        userRole: user.userRole,
                        isTutor: user.isTutor,
                        isAdmin: user.isAdmin
                    },
                    token
                })
            }
        )       
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error.");
    };
};

exports.geLoggedInUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        return res.json({
            statusCode: 200,
            message: "User gotten Successfully.",
            user
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error.")
    }
}