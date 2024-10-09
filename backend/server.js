const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use(cors({
	origin: "https://vignan-striver-sheet.netlify.app",
	methods: ["GET", "POST", "PUT", "DELETE"],
	credentials: true,
}));

mongoose.connect(process.env.MONGODB_URI)
	.then(() => console.log("MongoDB Connected"))
	.catch(err => console.log("MongoDB Connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server started on port ${ PORT }`);
});