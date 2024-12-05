import benefitsModel from "../models/benefitsModel.js";
import employeesModel from "../models/employeesModel.js";

const getBenefits = async (req, res) => {
    try {
        const benefits = await benefitsModel.getAllBenefits();
        res.render("benefits/index", { benefits });
    } catch (error) {
        console.error("Error al obtener beneficios:", error);
        res.status(500).send("Error al obtener beneficios");
    }
};

const showCreateForm = async (req, res) => {
    try {
        const employees = await employeesModel.getAllEmployees(); // Obtener empleados para el formulario
        res.render("benefits/form", { benefit: null, employees });
    } catch (error) {
        console.error("Error al cargar el formulario de creación:", error);
        res.status(500).send("Error al cargar el formulario de creación");
    }
};

const createBenefit = async (req, res) => {
    try {
        await benefitsModel.addBenefit(req.body);
        res.redirect("/benefits");
    } catch (error) {
        console.error("Error al agregar beneficio:", error);
        res.status(500).send("Error al agregar beneficio");
    }
};

const showEditForm = async (req, res) => {
    try {
        const benefit = await benefitsModel.getBenefitById(req.params.id);
        const employees = await employeesModel.getAllEmployees(); // Obtener empleados para el formulario
        if (!benefit) {
            return res.status(404).send("Beneficio no encontrado");
        }
        res.render("benefits/form", { benefit, employees });
    } catch (error) {
        console.error("Error al cargar el formulario de edición:", error);
        res.status(500).send("Error al cargar el formulario de edición");
    }
};

const editBenefit = async (req, res) => {
    try {
        await benefitsModel.updateBenefit(req.params.id, req.body);
        res.redirect("/benefits");
    } catch (error) {
        console.error("Error al actualizar beneficio:", error);
        res.status(500).send("Error al actualizar beneficio");
    }
};

const deleteBenefit = async (req, res) => {
    try {
        await benefitsModel.deleteBenefit(req.params.id);
        res.redirect("/benefits");
    } catch (error) {
        console.error("Error al eliminar beneficio:", error);
        res.status(500).send("Error al eliminar beneficio");
    }
};

export default { getBenefits, showCreateForm, createBenefit, showEditForm, editBenefit, deleteBenefit };
