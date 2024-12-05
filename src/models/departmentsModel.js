import db from "../../db/database.js";

const getAllDepartments = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM departments", [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

const getDepartmentById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM departments WHERE id = ?", [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

const addDepartment = (department) => {
    return new Promise((resolve, reject) => {
        const { name } = department;
        db.run("INSERT INTO departments (name) VALUES (?)", [name], function (err) {
            if (err) reject(err);
            else resolve(this.lastID);
        });
    });
};

const updateDepartment = (id, department) => {
    return new Promise((resolve, reject) => {
        const { name } = department;
        db.run("UPDATE departments SET name = ? WHERE id = ?", [name, id], function (err) {
            if (err) reject(err);
            else resolve(this.changes);
        });
    });
};

const deleteDepartment = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM departments WHERE id = ?", [id], function (err) {
            if (err) reject(err);
            else resolve(this.changes);
        });
    });
};

export default { getAllDepartments, getDepartmentById, addDepartment, updateDepartment, deleteDepartment };
