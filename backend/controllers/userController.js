const User = require("../models/user");

const getUser = async (req, res) => {
	try {
		const username = req.params.username;
		
		const user = await User.findOne({ username }).select("-password");
		
		if (!user) {
			return res.status(404).send("User not found");
		}
		
		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({
			message: "server error",
		});
	}
};

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find().select("-password");
		
		if (users.length === 0) {
			return res.status(404).json({ message: "No users found" });
		}
		
		res.status(200).json(users);
	} catch (err) {
		res.status(500).json({
			message: "Server error",
		});
	}
};

module.exports = { getUser, getAllUsers };