const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();


connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running...");
});

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const hobbyRoutes = require("./routes/hobbyRoutes");

app.use("/api/hobbies", hobbyRoutes);

const sessionRoutes = require("./routes/sessionRoutes");

app.use("/api/sessions", sessionRoutes);

const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);

const feedRoutes = require("./routes/feedRoutes");

app.use("/api/feed", feedRoutes);






const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
