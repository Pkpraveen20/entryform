import { createRootRoute, Outlet } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: () => (
    <div className="p-4 ">
      <h1 className="text-2xl font-bold mb-4 text-center ">Person Dashboard</h1>
      <Outlet />
    </div>
  ),
});