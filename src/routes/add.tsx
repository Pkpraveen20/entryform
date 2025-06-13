import { createRoute, useSearch } from "@tanstack/react-router";
import { rootRoute } from "./root";

import { useEffect, useState } from "react";

import { useQueryHook } from "../addComponents/useQuaryHook";
import { useAddPerson } from "../addComponents/useAddPerson";
import { formDataInitial } from "../constants/addComponentConstants";

export const addRoute = createRoute({
  path: "/add",
  getParentRoute: () => rootRoute,
  component: AddPerson,
});

function AddPerson() {
  const search = useSearch({ from: addRoute.id });
  const editId = search.editId as number | undefined;

  const addPerson = useAddPerson(editId);

  const { data: editData } = useQueryHook(editId);

  const [formData, setFormData] = useState(formDataInitial);

  useEffect(() => {
    if (editData) setFormData(editData);
  }, [editData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "age" ? +value : value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addPerson.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        type="submit"
      >
        {editId ? "Update" : "Add"} Person
      </button>
    </form>
  );
}
