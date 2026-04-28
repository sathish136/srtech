import { Router, type IRouter } from "express";
import healthRouter from "./health";
import customersRouter from "./customers";
import assetsRouter from "./assets";
import installationsRouter from "./installations";
import ticketsRouter from "./tickets";
import invoicesRouter from "./invoices";
import employeesRouter from "./employees";
import attendanceRouter from "./attendance";
import dashboardRouter from "./dashboard";
import leadsRouter from "./leads";
import followupsRouter from "./followups";

const router: IRouter = Router();

router.use(healthRouter);
router.use(dashboardRouter);
router.use(customersRouter);
router.use(assetsRouter);
router.use(installationsRouter);
router.use(ticketsRouter);
router.use(invoicesRouter);
router.use(employeesRouter);
router.use(attendanceRouter);
router.use(leadsRouter);
router.use(followupsRouter);

export default router;
