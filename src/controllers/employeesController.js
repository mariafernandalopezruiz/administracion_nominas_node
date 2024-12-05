import departmentsModel from "../models/departmentsModel.js";
import employeesModel from "../models/employeesModel.js";
import positionsModel from "../models/positionsModel.js";



const getEmployees = async (req, res) => {
    try {
        const employees = await employeesModel.getAllEmployees();
        res.render("employees/index", { employees });
    } catch (error) {
        console.error("Error al obtener empleados:", error);
        res.status(500).send("Error al obtener empleados");
    }
};

const showCreateForm = async (req, res) => {
    try {
        const positions = await positionsModel.getAllPositions(); // Obtener todas las posiciones
        const departments = await departmentsModel.getAllDepartments()
        res.render("employees/form", { employee: null, positions, departments }); // Pasar posiciones a la vista
    } catch (error) {
        console.error("Error al cargar el formulario de creación:", error);
        res.status(500).send("Error al cargar el formulario de creación");
    }
};

const createEmployee = async (req, res) => {
    try {
        await employeesModel.addEmployee(req.body);
        res.redirect("/employees");
    } catch (error) {
        console.error("Error al agregar empleado:", error);
        res.status(500).send("Error al agregar empleado");
    }
};

const showEditForm = async (req, res) => {
    try {
        const employee = await employeesModel.getEmployeeById(req.params.id); // Obtener el empleado
        const positions = await positionsModel.getAllPositions(); // Obtener todas las posiciones
        if (!employee) {
            return res.status(404).send("Empleado no encontrado");
        }
        res.render("employees/form", { employee, positions }); // Pasar posiciones y empleado a la vista
    } catch (error) {
        console.error("Error al cargar el formulario de edición:", error);
        res.status(500).send("Error al cargar el formulario de edición");
    }
};

const editEmployee = async (req, res) => {
    try {
        await employeesModel.updateEmployee(req.params.id, req.body);
        res.redirect("/employees");
    } catch (error) {
        console.error("Error al actualizar empleado:", error);
        res.status(500).send("Error al actualizar empleado");
    }
};

const deleteEmployee = async (req, res) => {
    try {
        await employeesModel.deleteEmployee(req.params.id);
        res.redirect("/employees");
    } catch (error) {
        console.error("Error al eliminar empleado:", error);
        res.status(500).send("Error al eliminar empleado");
    }
};

export default { getEmployees, showCreateForm, createEmployee, showEditForm, editEmployee, deleteEmployee };
