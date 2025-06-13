import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchPeople = () => {
  return useQuery({
    queryKey: ["people"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3001/people");
      return res.data;
    },
  });
};
