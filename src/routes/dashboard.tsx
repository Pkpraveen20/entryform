import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";
import { Link } from "@tanstack/react-router";
import { useFetchPeople } from "../customHook/useFetchPeople";
import { DataTable } from "../components/Table/Table";
import { usePersonColumns } from "../config/usePersonColumn";

export const dashboardRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  component: Dashboard,
});

function Dashboard() {
  const { data = [], isLoading } = useFetchPeople();
  const columns = usePersonColumns();

  if (isLoading) return <div>Loading…</div>;

  return (
    <div className="p-4">
      <div className="mb-4 text-right">
        <Link to="/add" className="bg-green-500 text-white px-4 py-2 rounded">
          Add Person
        </Link>
      </div>

      <DataTable
        data={data}
        columns={columns}
        pageSize={5}
        enableGlobalFilter
      />
    </div>
  );
}
