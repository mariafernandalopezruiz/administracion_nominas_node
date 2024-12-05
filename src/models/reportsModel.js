import db from "../../db/database.js";

const getPayrollReport = () => {
    return new Promise((resolve, reject) => {
        db.all(
            `
            SELECT 
                employees.name AS employee_name,
                SUM(payrolls.salary) AS total_salary,
                SUM(payrolls.bonus) AS total_bonus,
                SUM(payrolls.deductions) AS total_deductions,
                SUM(payrolls.total) AS net_total,
                COUNT(payrolls.id) AS payroll_count
            FROM payrolls
            JOIN employees ON payrolls.employee_id = employees.id
            GROUP BY employees.id
            ORDER BY employees.name
            `,
            [],
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });
};

const getGeneralStatistics = () => {
    return new Promise((resolve, reject) => {
        db.get(
            `
            SELECT 
                SUM(payrolls.salary) AS total_salary,
                SUM(payrolls.bonus) AS total_bonus,
                SUM(payrolls.deductions) AS total_deductions,
                SUM(payrolls.total) AS net_total,
                AVG(payrolls.salary) AS average_salary,
                AVG(payrolls.bonus) AS average_bonus,
                AVG(payrolls.deductions) AS average_deductions
            FROM payrolls
            `,
            [],
            (err, row) => {
                if (err) reject(err);
                else resolve(row);
            }
        );
    });
};

export default { getPayrollReport, getGeneralStatistics };
