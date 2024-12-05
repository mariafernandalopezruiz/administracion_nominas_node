import db from "../../db/database.js";

const getAllPayrolls = () => {
    return new Promise((resolve, reject) => {
        db.all(
            `
            SELECT 
                payrolls.id, 
                employees.name AS employee_name, 
                payrolls.salary, 
                payrolls.payment_date, 
                payrolls.bonus, 
                payrolls.deductions, 
                payrolls.total 
            FROM payrolls 
            JOIN employees ON payrolls.employee_id = employees.id
            `,
            [],
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });
};

const getPayrollById = (id) => {
    return new Promise((resolve, reject) => {
        db.get(
            `
            SELECT * 
            FROM payrolls 
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

const addPayroll = (payroll) => {
    return new Promise((resolve, reject) => {
        const { employee_id, salary, payment_date, bonus, deductions, total } = payroll;
        db.run(
            `
            INSERT INTO payrolls (employee_id, salary, payment_date, bonus, deductions, total) 
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [employee_id, salary, payment_date, bonus, deductions, total],
            function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            }
        );
    });
};

const updatePayroll = (id, payroll) => {
    return new Promise((resolve, reject) => {
        const { employee_id, salary, payment_date, bonus, deductions, total } = payroll;
        db.run(
            `
            UPDATE payrolls 
            SET employee_id = ?, salary = ?, payment_date = ?, bonus = ?, deductions = ?, total = ? 
            WHERE id = ?
            `,
            [employee_id, salary, payment_date, bonus, deductions, total, id],
            function (err) {
                if (err) reject(err);
                else resolve(this.changes);
            }
        );
    });
};

const deletePayroll = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM payrolls WHERE id = ?", [id], function (err) {
            if (err) reject(err);
            else resolve(this.changes);
        });
    });
};

export default { getAllPayrolls, getPayrollById, addPayroll, updatePayroll, deletePayroll };
