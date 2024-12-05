import express from "express";
import payrollsController from "../controllers/payrollsController.js";

const router = express.Router();


// Listar nóminas
router.get("/", payrollsController.getPayrolls);
router.get("/create", payrollsController.showCreateForm);
router.post("/create", payrollsController.createPayroll);
router.get("/edit/:id", payrollsController.showEditForm);
router.post("/edit/:id", payrollsController.editPayroll);
router.get("/delete/:id", payrollsController.deletePayroll);



export default router;
