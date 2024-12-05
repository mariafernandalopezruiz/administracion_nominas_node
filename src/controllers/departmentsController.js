import departmentsModel from "../models/departmentsModel.js";

const getDepartments = async (req, res) => {
    try {
        const departments = await departmentsModel.getAllDepartments();
        res.render("departments/index", { departments });
    } catch (error) {
        console.error("Error al obtener departamentos:", error);
        res.status(500).send("Error al obtener departamentos");
    }
};

const showCreateForm = (req, res) => {
    res.render("departments/form", { department: null });
};

const createDepartment = async (req, res) => {
    try {
        await departmentsModel.addDepartment(req.body);
        res.redirect("/departments");
    } catch (error) {
        console.error("Error al agregar departamento:", error);
        res.status(500).send("Error al agregar departamento");
    }
};

const showEditForm = async (req, res) => {
    try {
        const department = await departmentsModel.getDepartmentById(req.params.id);
        if (!department) {
            return res.status(404).send("Departamento no encontrado");
        }
        res.render("departments/form", { department });
    } catch (error) {
        console.error("Error al cargar el formulario de edición:", error);
        res.status(500).send("Error al cargar el formulario de edición");
    }
};

const editDepartment = async (req, res) => {
    try {
        await departmentsModel.updateDepartment(req.params.id, req.body);
        res.redirect("/departments");
    } catch (error) {
        console.error("Error al actualizar departamento:", error);
        res.status(500).send("Error al actualizar departamento");
    }
};

const deleteDepartment = async (req, res) => {
    try {
        await departmentsModel.deleteDepartment(req.params.id);
        res.redirect("/departments");
    } catch (error) {
        console.error("Error al eliminar departamento:", error);
        res.status(500).send("Error al eliminar departamento");
    }
};

export default { getDepartments, showCreateForm, createDepartment, showEditForm, editDepartment, deleteDepartment };
