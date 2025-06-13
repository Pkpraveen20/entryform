import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import { Person } from "../types/type";



export const useQueryHook = (editId: any) => {
  return useQuery<Person | undefined>({
    queryKey: ["person", editId],
    enabled: !!editId,
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3001/people/${editId}`);
      return res.data;
    },
  });
};
