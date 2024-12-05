import positionsModel from "../models/positionsModel.js";

const getPositions = async (req, res) => {
    try {
        const positions = await positionsModel.getAllPositions();
        res.render("positions/index", { positions });
    } catch (error) {
        console.error("Error al obtener posiciones:", error);
        res.status(500).send("Error al obtener posiciones");
    }
};

const showCreateForm = (req, res) => {
    res.render("positions/form", { position: null });
};

const createPosition = async (req, res) => {
    try {
        await positionsModel.addPosition(req.body);
        res.redirect("/positions");
    } catch (error) {
        console.error("Error al agregar posición:", error);
        res.status(500).send("Error al agregar posición");
    }
};

const showEditForm = async (req, res) => {
    try {
        const position = await positionsModel.getPositionById(req.params.id);
        if (!position) {
            return res.status(404).send("Posición no encontrada");
        }
        res.render("positions/form", { position });
    } catch (error) {
        console.error("Error al cargar el formulario de edición:", error);
        res.status(500).send("Error al cargar el formulario de edición");
    }
};

const editPosition = async (req, res) => {
    try {
        await positionsModel.updatePosition(req.params.id, req.body);
        res.redirect("/positions");
    } catch (error) {
        console.error("Error al actualizar posición:", error);
        res.status(500).send("Error al actualizar posición");
    }
};

const deletePosition = async (req, res) => {
    try {
        await positionsModel.deletePosition(req.params.id);
        res.redirect("/positions");
    } catch (error) {
        console.error("Error al eliminar posición:", error);
        res.status(500).send("Error al eliminar posición");
    }
};

export default { getPositions, showCreateForm, createPosition, showEditForm, editPosition, deletePosition };
