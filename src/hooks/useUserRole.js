import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "./useAuth"; // ✅ IMPORT DONE

const useUserRole = () => {
  const { user } = useAuth(); // ✅ useAuth now defined

  const { data: role, isLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/api/users?email=${user.email}`);
      const role= res.data?.role;
      return role || "user";
    },
    enabled: !!user?.email,
  });

  return [role, isLoading];
};

export default useUserRole;
