
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Employee routes
const employeeRoutes = require("./routes/employeeRoutes");

app.use("/api/employees", employeeRoutes);

// Test API
app.get("/", (req, res) => {
    res.json({
        message: "Employee Management API is running!"
    });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
