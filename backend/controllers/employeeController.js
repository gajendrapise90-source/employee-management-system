
const db = require("../config/db");

// GET - Fetch all employees
exports.getEmployees = (req, res) => {
    const sql = "SELECT * FROM employees ORDER BY id DESC";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Error fetching employees",
                error: err.message
            });
        }

        res.status(200).json(results);
    });
};

// POST - Add new employee
exports.addEmployee = (req, res) => {
    const { name, department, role, salary, join_date } = req.body;

    if (!name || !department || !role || salary === undefined || salary === "" || !join_date) {
        return res.status(400).json({
            message: "All employee fields are required"
        });
    }

    if (!Number.isFinite(Number(salary)) || Number(salary) < 0) {
        return res.status(400).json({
            message: "Salary must be a valid non-negative number"
        });
    }

    const sql = `
        INSERT INTO employees
        (name, department, role, salary, join_date)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [name, department, role, salary, join_date], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Error adding employee",
                error: err.message
            });
        }

        res.status(201).json({
            message: "Employee added successfully",
            employeeId: result.insertId
        });
    });
};

// PUT - Update employee
exports.updateEmployee = (req, res) => {
    const { id } = req.params;
    const { name, department, role, salary, join_date } = req.body;

    if (!name || !department || !role || salary === undefined || salary === "" || !join_date) {
        return res.status(400).json({
            message: "All employee fields are required"
        });
    }

    if (!Number.isFinite(Number(salary)) || Number(salary) < 0) {
        return res.status(400).json({
            message: "Salary must be a valid non-negative number"
        });
    }

    const sql = `
        UPDATE employees
        SET name = ?, department = ?, role = ?, salary = ?, join_date = ?
        WHERE id = ?
    `;

    db.query(sql, [name, department, role, salary, join_date, id], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Error updating employee",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json({
            message: "Employee updated successfully"
        });
    });
};

// DELETE - Delete employee
exports.deleteEmployee = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM employees WHERE id = ?", [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Error deleting employee",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json({
            message: "Employee deleted successfully"
        });
    });
};
