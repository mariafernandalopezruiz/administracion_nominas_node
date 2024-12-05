import express from "express";
import positionsController from "../controllers/positionsController.js";

const router = express.Router();

// Listar posiciones
router.get("/", positionsController.getPositions);
router.get("/create", positionsController.showCreateForm);
router.post("/create", positionsController.createPosition);
router.get("/edit/:id", positionsController.showEditForm);
router.post("/edit/:id", positionsController.editPosition);
router.get("/delete/:id", positionsController.deletePosition);

export default router;
