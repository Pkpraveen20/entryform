import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./routes/root";
import { dashboardRoute } from "./routes/dashboard";
import { addRoute } from "./routes/add";

const routeTree = rootRoute.addChildren([dashboardRoute, addRoute]);
export const router = createRouter({ routeTree });