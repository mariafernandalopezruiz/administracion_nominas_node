import express from "express";
import benefitsController from "../controllers/benefitsController.js";

const router = express.Router();

// Listar beneficios
router.get("/", benefitsController.getBenefits);
router.get("/create", benefitsController.showCreateForm);
router.post("/create", benefitsController.createBenefit);
router.get("/edit/:id", benefitsController.showEditForm);
router.post("/edit/:id", benefitsController.editBenefit);
router.get("/delete/:id", benefitsController.deleteBenefit);



export default router;
