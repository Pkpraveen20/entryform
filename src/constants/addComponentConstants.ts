import { Person } from "../types/type";

export const formDataInitial: Omit<Person, "id" | "createdAt"> = {
  name: "",
  age: 0,
  email: "",
};
