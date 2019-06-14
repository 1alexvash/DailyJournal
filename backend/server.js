const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Midleware
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/records", require("./routes/api/records"));

const PORT = 8080;
app.listen(PORT, () => console.log(`The Server is listening on port ${PORT}`));
