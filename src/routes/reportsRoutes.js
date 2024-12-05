import express from "express";
import reportsController from "../controllers/reportsController.js";

const router = express.Router();

// Generar reporte de nóminas
router.get("/payroll", reportsController.getPayrollReport);

export default router;
