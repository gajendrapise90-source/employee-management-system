
const express = require("express");
const router = express.Router();

const {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee
} = require("../controllers/employeeController");

// GET all employees
router.get("/", getEmployees);

// POST new employee
router.post("/", addEmployee);

// PUT update employee
router.put("/:id", updateEmployee);

// DELETE employee
router.delete("/:id", deleteEmployee);

module.exports = router;
