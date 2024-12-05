import payrollsModel from "../models/payrollsModel.js";
import employeesModel from "../models/employeesModel.js";

const getPayrolls = async (req, res) => {
    try {
        const payrolls = await payrollsModel.getAllPayrolls();
        res.render("payrolls/index", { payrolls });
    } catch (error) {
        console.error("Error al obtener nóminas:", error);
        res.status(500).send("Error al obtener nóminas");
    }
};

const showCreateForm = async (req, res) => {
    try {
        const employees = await employeesModel.getAllEmployees(); // Obtener empleados para el formulario
        res.render("payrolls/form", { payroll: null, employees });
    } catch (error) {
        console.error("Error al cargar el formulario de creación:", error);
        res.status(500).send("Error al cargar el formulario de creación");
    }
};

const createPayroll = async (req, res) => {
    try {
        const { salary, bonus, deductions } = req.body;
        const total = parseFloat(salary) + parseFloat(bonus || 0) - parseFloat(deductions || 0); // Calcular total
        await payrollsModel.addPayroll({ ...req.body, total });
        res.redirect("/payrolls");
    } catch (error) {
        console.error("Error al agregar nómina:", error);
        res.status(500).send("Error al agregar nómina");
    }
};

const showEditForm = async (req, res) => {
    try {
        const payroll = await payrollsModel.getPayrollById(req.params.id);
        const employees = await employeesModel.getAllEmployees(); // Obtener empleados para el formulario
        if (!payroll) {
            return res.status(404).send("Nómina no encontrada");
        }
        res.render("payrolls/form", { payroll, employees });
    } catch (error) {
        console.error("Error al cargar el formulario de edición:", error);
        res.status(500).send("Error al cargar el formulario de edición");
    }
};

const editPayroll = async (req, res) => {
    try {
        const { salary, bonus, deductions } = req.body;
        const total = parseFloat(salary) + parseFloat(bonus || 0) - parseFloat(deductions || 0); // Calcular total
        await payrollsModel.updatePayroll(req.params.id, { ...req.body, total });
        res.redirect("/payrolls");
    } catch (error) {
        console.error("Error al actualizar nómina:", error);
        res.status(500).send("Error al actualizar nómina");
    }
};

const deletePayroll = async (req, res) => {
    try {
        await payrollsModel.deletePayroll(req.params.id);
        res.redirect("/payrolls");
    } catch (error) {
        console.error("Error al eliminar nómina:", error);
        res.status(500).send("Error al eliminar nómina");
    }
};

export default { getPayrolls, showCreateForm, createPayroll, showEditForm, editPayroll, deletePayroll };
