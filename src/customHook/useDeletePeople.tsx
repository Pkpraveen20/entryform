import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


   export const useDeletePeople = () => {
      const queryClient = useQueryClient();

    return useMutation ({
        mutationFn: (id: number) =>
      axios.delete(`http://localhost:3001/people/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["people"] }),

    })
}