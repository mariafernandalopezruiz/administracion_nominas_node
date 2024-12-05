import db from "../../db/database.js";

const getAllEmployees = () => {
    return new Promise((resolve, reject) => {
        db.all(
            `
            SELECT 
                employees.id,
                employees.name,
                positions.name AS position,
                departments.name AS department,
                employees.email,
                employees.phone
            FROM employees
            JOIN positions ON employees.position_id = positions.id
            JOIN departments ON employees.department_id = departments.id
            `,
            [],
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });
};

const getEmployeeById = (id) => {
    return new Promise((resolve, reject) => {
        db.get(
            `
            SELECT * 
            FROM employees 
            WHERE id = ?
            `,
            [id],
            (err, row) => {
                if (err) reject(err);
                else resolve(row);
            }
        );
    });
};

const addEmployee = (employee) => {
    return new Promise((resolve, reject) => {
        const { name, position_id, department_id, email, phone } = employee;
        db.run(
            `
            INSERT INTO employees (name, position_id, department_id, email, phone) 
            VALUES (?, ?, ?, ?, ?)
            `,
            [name, position_id, department_id, email, phone],
            function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            }
        );
    });
};

const updateEmployee = (id, employee) => {
    return new Promise((resolve, reject) => {
        const { name, position_id, department_id, email, phone } = employee;
        db.run(
            `
            UPDATE employees 
            SET name = ?, position_id = ?, department_id = ?, email = ?, phone = ? 
            WHERE id = ?
            `,
            [name, position_id, department_id, email, phone, id],
            function (err) {
                if (err) reject(err);
                else resolve(this.changes);
            }
        );
    });
};

const deleteEmployee = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM employees WHERE id = ?", [id], function (err) {
            if (err) reject(err);
            else resolve(this.changes);
        });
    });
};

export default { getAllEmployees, getEmployeeById, addEmployee, updateEmployee, deleteEmployee };
