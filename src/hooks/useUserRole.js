import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useUserRole = () => {
  const { user } = useContext(AuthContext);

  const { data: role, isLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/api/users?email=${user.email}`);
      return res.data?.role || "user";
    },
    enabled: !!user?.email,
  });

  return [role, isLoading];
};

export default useUserRole;
