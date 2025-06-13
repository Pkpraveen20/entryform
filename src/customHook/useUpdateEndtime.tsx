import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Person } from "../types/type";
import axios from "axios";
import { DateTime } from "luxon";

export const useUpdateEndtime = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (person: Person) =>
      axios.put(`http://localhost:3001/people/${person.id}`, {
        ...person,
        endTime: DateTime.now().toFormat("dd/MM/yyyy HH:mm:ss"),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["people"] }),
  });
};
