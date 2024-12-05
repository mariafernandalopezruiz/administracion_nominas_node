import express from "express";
import employeesController from "../controllers/employeesController.js";

const router = express.Router();

router.get("/", employeesController.getEmployees);
router.get("/create", employeesController.showCreateForm);
router.post("/create", employeesController.createEmployee);
router.get("/edit/:id", employeesController.showEditForm);
router.post("/edit/:id", employeesController.editEmployee);
router.get("/delete/:id", employeesController.deleteEmployee);

export default router;
