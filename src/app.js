import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";
import bodyParser from "body-parser";



import payrollsRoutes from "./routes/payrollsRoutes.js";
import departmentsRoutes from "./routes/departmentsRoutes.js";
import employeesRoutes from "./routes/employeesRoutes.js";
import positionsRoutes from "./routes/positionsRoutes.js";
import benefitsRoutes from "./routes/benefitsRoutes.js";
import reportsRoutes from "./routes/reportsRoutes.js";





const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(expressLayouts);
app.set("layout", "layouts/layout");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));


/* ROUTES */
app.use("/benefits", benefitsRoutes);
app.use("/payrolls", payrollsRoutes);
app.use("/employees", employeesRoutes);
app.use("/positions", positionsRoutes);
app.use("/departments", departmentsRoutes);
app.use("/reports", reportsRoutes);



export default app;
