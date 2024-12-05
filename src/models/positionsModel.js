import db from "../../db/database.js";

const getAllPositions = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM positions", [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

const getPositionById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM positions WHERE id = ?", [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

const addPosition = (position) => {
    return new Promise((resolve, reject) => {
        const { name, base_salary } = position;
        db.run(
            "INSERT INTO positions (name, base_salary) VALUES (?, ?)",
            [name, base_salary],
            function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            }
        );
    });
};

const updatePosition = (id, position) => {
    return new Promise((resolve, reject) => {
        const { name, base_salary } = position;
        db.run(
            "UPDATE positions SET name = ?, base_salary = ? WHERE id = ?",
            [name, base_salary, id],
            function (err) {
                if (err) reject(err);
                else resolve(this.changes);
            }
        );
    });
};

const deletePosition = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM positions WHERE id = ?", [id], function (err) {
            if (err) reject(err);
            else resolve(this.changes);
        });
    });
};

export default { getAllPositions, getPositionById, addPosition, updatePosition, deletePosition };
