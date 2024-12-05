import db from "../../db/database.js";

const getAllBenefits = () => {
    return new Promise((resolve, reject) => {
        db.all(
            `
            SELECT 
                benefits.id, 
                benefits.name AS benefit_name, 
                benefits.amount, 
                employees.name AS employee_name
            FROM benefits
            JOIN employees ON benefits.employee_id = employees.id
            `,
            [],
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });
};

const getBenefitById = (id) => {
    return new Promise((resolve, reject) => {
        db.get(
            `
            SELECT * 
            FROM benefits 
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

const addBenefit = (benefit) => {
    return new Promise((resolve, reject) => {
        const { name, amount, employee_id } = benefit;
        db.run(
            `
            INSERT INTO benefits (name, amount, employee_id) 
            VALUES (?, ?, ?)
            `,
            [name, amount, employee_id],
            function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            }
        );
    });
};

const updateBenefit = (id, benefit) => {
    return new Promise((resolve, reject) => {
        const { name, amount, employee_id } = benefit;
        db.run(
            `
            UPDATE benefits 
            SET name = ?, amount = ?, employee_id = ? 
            WHERE id = ?
            `,
            [name, amount, employee_id, id],
            function (err) {
                if (err) reject(err);
                else resolve(this.changes);
            }
        );
    });
};

const deleteBenefit = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM benefits WHERE id = ?", [id], function (err) {
            if (err) reject(err);
            else resolve(this.changes);
        });
    });
};

export default { getAllBenefits, getBenefitById, addBenefit, updateBenefit, deleteBenefit };
