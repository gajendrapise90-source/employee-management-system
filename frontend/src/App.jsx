
import { useEffect, useState } from "react";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee
} from "./services/employeeService";

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("id");
const [sortOrder, setSortOrder] = useState("desc");
const [showForm, setShowForm] = useState(false);
const [editId, setEditId] = useState(null);
const [formData, setFormData] = useState({
  name: "",
  department: "",
  role: "",
  salary: "",
  join_date: ""
});
const handleDeleteEmployee = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this employee?"
  );

  if (!confirmDelete) return;

  try {
    await deleteEmployee(id);
    await fetchEmployees();
    alert("Employee deleted successfully!");
  } catch (err) {
    alert(err.message);
  }
};
const handleEditEmployee = (emp) => {
  setEditId(emp.id);

  setFormData({
    name: emp.name,
    department: emp.department,
    role: emp.role,
    salary: emp.salary,
    join_date: String(emp.join_date).slice(0, 10)
  });

  setShowForm(true);
};
const handleInputChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value
  }));
};

const handleAddEmployee = async (e) => {
  e.preventDefault();

  try {
if (editId) {
  await updateEmployee(editId, formData);
} else {
  await addEmployee(formData);
}
    setFormData({
      name: "",
      department: "",
      role: "",
      salary: "",
      join_date: ""
    });

setShowForm(false);
setEditId(null);
await fetchEmployees();
    alert("Employee added successfully!");
  } catch (err) {
    alert(err.message);
  }
};
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await getEmployees();
      setEmployees(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const departments = new Set(
    employees.map((emp) => emp.department)
  ).size;
const handleSort = (field) => {
  if (sortField === field) {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  } else {
    setSortField(field);
    setSortOrder("asc");
  }
};
const filteredEmployees = employees
  .filter((emp) =>
    [emp.name, emp.department, emp.role]
      .some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
  )
  .sort((a, b) => {
    let valueA = a[sortField];
    let valueB = b[sortField];

    if (sortField === "salary" || sortField === "id") {
      valueA = Number(valueA);
      valueB = Number(valueB);
    } else {
      valueA = String(valueA).toLowerCase();
      valueB = String(valueB).toLowerCase();
    }

    if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
    if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;

    return 0;
  });
  return (
    <div className="app">
      <aside className="sidebar">
        <h2>EMS.</h2>
        <p className="sidebar-label">MAIN MENU</p>
        <div className="nav-item active">▦ Dashboard</div>
        <div className="nav-item">♙ Employees</div>
        <div className="nav-item">⚙ Settings</div>
        <div className="sidebar-footer">Employee Management System</div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome to Employee Management System</p>
          </div>
          <div className="admin-profile">
            <span>Admin</span>
            <div className="avatar">A</div>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <span>Total Employees</span>
            <h2>{employees.length}</h2>
            <p>Registered employees</p>
          </div>

          <div className="stat-card">
            <span>Departments</span>
            <h2>{departments}</h2>
            <p>Active departments</p>
          </div>

          <div className="stat-card">
            <span>Average Salary</span>
            <h2>
              ₹{employees.length
                ? Math.round(
                    employees.reduce(
                      (sum, emp) => sum + Number(emp.salary), 0
                    ) / employees.length
                  ).toLocaleString("en-IN")
                : 0}
            </h2>
            <p>Per employee</p>
          </div>
        </section>
{showForm && (
  <section className="employee-section form-section">
<h2>{editId ? "Edit Employee" : "Add New Employee"}</h2>
    <form onSubmit={handleAddEmployee}>
      <input
        type="text"
        name="name"
        placeholder="Employee Name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />

      <input
        type="text"
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={handleInputChange}
        required
      />

      <input
        type="text"
        name="role"
        placeholder="Job Role"
        value={formData.role}
        onChange={handleInputChange}
        required
      />

      <input
        type="number"
        name="salary"
        placeholder="Salary"
        min="0"
        step="0.01"
        value={formData.salary}
        onChange={handleInputChange}
        required
      />

      <input
        type="date"
        name="join_date"
        value={formData.join_date}
        onChange={handleInputChange}
        required
      />

      <button type="submit" className="add-btn">
{editId ? "Update Employee" : "Save Employee"}      </button>

      <button
        type="button"
        className="cancel-btn"
        onClick={() => setShowForm(false)}
      >
        Cancel
      </button>
    </form>
  </section>
)}
        <section className="employee-section">
          <div className="section-header">
            <div>
              <h2>Employee Directory</h2>
              <p>Manage your employee records</p>
            </div>

<button
  className="add-btn"
  onClick={() => setShowForm(true)}
>
  + Add Employee
</button>          </div>

          <input
            className="search-input"
            type="text"
            placeholder="Search by name, department or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {error && <p className="error-message">{error}</p>}

        {loading ? (
          <div className="loading-state">
            <p>Loading employees...</p>
          </div>
        ) : (      
        <div className="table-wrapper">
              <table>
              <thead>
                <tr>
                  <th onClick={() => handleSort("id")}>ID ↕</th>
                  <th onClick={() => handleSort("name")}>Employee Name ↕</th>
                  <th onClick={() => handleSort("department")}>Department ↕</th>
                  <th onClick={() => handleSort("role")}>Role ↕</th>
                  <th onClick={() => handleSort("salary")}>Salary ↕</th>
                  <th onClick={() => handleSort("join_date")}>Join Date ↕</th>
                  <th>Actions</th>
                </tr>
              </thead>
                <tbody>
                  {filteredEmployees.map((emp) => (
                    <tr key={emp.id}>
                      <td>#{emp.id}</td>
                      <td>{emp.name}</td>
                      <td>{emp.department}</td>
                      <td>{emp.role}</td>
                      <td>₹{Number(emp.salary).toLocaleString("en-IN")}</td>
                      <td>
                        {new Date(emp.join_date).toLocaleDateString("en-IN")}
                      </td>
                      <td>
  <button
    className="edit-btn"
    onClick={() => handleEditEmployee(emp)}
  >
    Edit
  </button>

  <button
    className="delete-btn"
    onClick={() => handleDeleteEmployee(emp.id)}
  >
    Delete
  </button>
</td>
                    </tr>
                  ))}

                  {filteredEmployees.length === 0 && (
                    <tr>
                      <td colSpan="6" className="empty-state">
                        No employees found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
