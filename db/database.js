import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "nominas.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error("Error al conectar con la base de datos:", err.message);
    else console.log("Conectado a la base de datos SQLite");
});

// Crear tablas si no existen
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS departments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        );
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS positions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            base_salary REAL NOT NULL
        );
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            position_id INTEGER NOT NULL,
            department_id INTEGER NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            FOREIGN KEY (position_id) REFERENCES positions(id),
            FOREIGN KEY (department_id) REFERENCES departments(id)
        );
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS payrolls (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            employee_id INTEGER NOT NULL,
            salary REAL NOT NULL,
            payment_date TEXT NOT NULL,
            bonus REAL DEFAULT 0,
            deductions REAL DEFAULT 0,
            total REAL NOT NULL,
            FOREIGN KEY (employee_id) REFERENCES employees(id)
        );
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS benefits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            amount REAL NOT NULL,
            employee_id INTEGER NOT NULL,
            FOREIGN KEY (employee_id) REFERENCES employees(id)
        );
    `);
});

export default db;