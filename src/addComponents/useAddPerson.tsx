import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import axios from "axios";
import { DateTime } from "luxon";
export const useAddPerson = (editId: any) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: any) =>
      editId
        ? axios.put(`http://localhost:3001/people/${editId}`, data)
        : axios.post("http://localhost:3001/people", {
            ...data,
            createdAt: DateTime.now().toFormat("dd/MM/yyyy HH:mm:ss"),
          }),
    onSuccess: () => {
      navigate({ to: "/" });
    },
  });
};
