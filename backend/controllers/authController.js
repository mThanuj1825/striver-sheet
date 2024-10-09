const User = require("../models/User");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Sign Up Controller
const signup = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		
		const existingUsername = await User.findOne({ username });
		if (existingUsername) {
			return res.status(409).json({
				message: "Username already exist",
			});
		}
		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return res.status(409).json({
				message: "Email already exist",
			});
		}
		
		const hashedPassword = await bcrypt.hash(password, 10);
		
		const newUser = await User.create({
			username,
			email,
			password: hashedPassword,
		});
		
		res.status(201).json({
			message: "User registered successfully",
			user: {
				_id: newUser._id,
				username: newUser.username,
				email: newUser.email,
			},
		});
	} catch (err) {
		res.status(400).json({
			message: "Error registering user",
			error: err.message,
		});
	}
};

// Login Controller
const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		
		if (user === null) {
			return res.status(401).json({
				message: "Invalid credentials",
			});
		}
		
		let token = null;
		
		if (user && (await bcrypt.compare(password, user.password))) {
			token = jwt.sign(
				{ userId: user._id },
				process.env.JWT_SECRET,
				{ expiresIn: "1d" },
			);
			
			res.status(200).json({
				message: "Login successful",
				token,
				user,
			});
		} else {
			res.status(401).json({
				message: "Invalid credentials",
			});
		}
	} catch (err) {
		res.status(400).json({
			message: "Error logging in",
			error: err.message,
		});
	}
};

// Admin Login Controller
const adminLogin = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await Admin.findOne({ username });
		
		let token = null;
		if (user && (await bcrypt.compare(password, user.password))) {
			token = jwt.sign(
				{ userId: user._id },
				process.env.JWT_SECRET,
				{ expiresIn: "1d" },
			);
			
			res.status(200).json({
				message: "Login successful",
				token,
				user,
			});
		} else {
			res.status(401).json({
				message: "Invalid credentials",
			});
		}
	} catch (err) {
		res.status(400).json({
			message: "Error logging in",
			error: err.message,
		});
	}
};

module.exports = {
	signup,
	login,
	adminLogin,
};
