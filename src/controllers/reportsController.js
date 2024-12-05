import reportsModel from "../models/reportsModel.js";

const getPayrollReport = async (req, res) => {
    try {
        const payrollReport = await reportsModel.getPayrollReport();
        const generalStatistics = await reportsModel.getGeneralStatistics();
        res.render("reports/payroll", { payrollReport, generalStatistics });
    } catch (error) {
        console.error("Error al generar el reporte de nóminas:", error);
        res.status(500).send("Error al generar el reporte de nóminas");
    }
};

export default { getPayrollReport };
