const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const verifyToken = (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];
	
	if (!token) {
		return res.status(401).json({
			message: "Access denied",
		});
	}
	
	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			return res.status(403).json({
				message: "Invalid token",
			});
		}
		
		req.user = user;
		next();
	});
};

const isAdmin = async (req, res, next) => {
	const user = await Admin.findById(req.user.userId);
	
	if (user === null) {
		return res.status(403).json({ message: "Access denied!" });
	}
	
	next();
};

module.exports = { verifyToken, isAdmin };