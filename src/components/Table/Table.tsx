import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import { useState } from "react";

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  pageSize?: number;
  enableGlobalFilter?: boolean;
}

export function DataTable<T>({
  data,
  columns,
  pageSize = 10,
  enableGlobalFilter = true,
}: DataTableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize,
  });

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, sorting, pagination },
    enableGlobalFilter,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full">
      {enableGlobalFilter && (
        <input
          type="text"
          placeholder="Search…"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mb-4 w-full sm:w-64"
        />
      )}

      <table className="table-auto w-full border border-collapse border-gray-300">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id} className="bg-gray-100">
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="border px-4 py-2 cursor-pointer select-none"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() === "asc"
                    ? " ▲"
                    : header.column.getIsSorted() === "desc"
                    ? " ▼"
                    : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
          <tbody>
  {table.getRowModel().rows.length === 0 ? (
    <tr>
      <td colSpan={table.getAllColumns().length} className="text-center py-4">
        Data not found
      </td>
    </tr>
  ) : (
    table.getRowModel().rows.map((row) => (
      <tr key={row.id} className="hover:bg-gray-50">
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id} className="border px-4 py-2">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    ))
  )}
</tbody>
        
      </table>

      <div className="flex justify-between items-center mt-4">
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
