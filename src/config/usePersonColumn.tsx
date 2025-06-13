import { ColumnDef } from "@tanstack/react-table";
import { Person } from "../types/type";
import { useUpdateEndtime } from "../customHook/useUpdateEndtime";
import { useDeletePeople } from "../customHook/useDeletePeople";
import { parseDDMMYYYY } from "../utils/filter.utils";
import { Link } from "@tanstack/react-router";

export const usePersonColumns = (): ColumnDef<Person>[] => {
  const updateEndtime = useUpdateEndtime();
  const deleteMutation = useDeletePeople();

  const columns: ColumnDef<Person>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "age", header: "Age" },
    { accessorKey: "email", header: "Email" },
    {
      accessorKey: "createdAt",
      header: "Start Time",
      sortingFn: (a, b, colId) =>
        parseDDMMYYYY(a.getValue(colId)) - parseDDMMYYYY(b.getValue(colId)),
    },
    { accessorKey: "endTime", header: "End Time" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Link
            to="/add"
            search={{ editId: row.original.id }}
            className="text-blue-500"
          >
            Edit
          </Link>
          <button
            onClick={() => deleteMutation.mutate(row.original.id)}
            className="text-red-500"
          >
            Delete
          </button>
          <button
            onClick={() => updateEndtime.mutate(row.original)}
            disabled={!!row.original.endTime}
            className={
              row.original.endTime
                ? "text-gray-400 cursor-not-allowed"
                : "text-yellow-600"
            }
          >
            Out
          </button>
        </div>
      ),
    },
  ];

  return columns;
};
