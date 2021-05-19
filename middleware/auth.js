const jwt = require("jsonwebtoken");
require("dotenv").config
const { SECRET } = process.env

module.exports = (req, res, next) =>  {
    // Get token from header
    const token = req.header("x-auth-token");
    if (!token) {
        res.status(401).json({
            statusCode: 401,
            message: "No token, authorization denied."
        })
    }
    try {
        const decoded = jwt.verify(token, SECRET);

        // Assign User to request object
        req.user = decoded.user;
        next;
    } catch (error) {
        res.status(401).json({
            statusCode: 401,
            messsage: "Token is not valid."
        });
    };
}