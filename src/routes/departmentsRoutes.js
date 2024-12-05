import express from "express";
import departmentsController from "../controllers/departmentsController.js";

const router = express.Router();

// Listar departamentos
router.get("/", departmentsController.getDepartments);
router.get("/create", departmentsController.showCreateForm);
router.post("/create", departmentsController.createDepartment);
router.get("/edit/:id", departmentsController.showEditForm);
router.post("/edit/:id", departmentsController.editDepartment);
router.get("/delete/:id", departmentsController.deleteDepartment);






export default router;
