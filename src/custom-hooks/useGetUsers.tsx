import axios from "@/common/http-client";
import { useEffect, useState } from "react";

export const useGetUsers = (load?: any) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/users/getUsers");
      setData(data);
    } catch (error) {
      console.log(error);
      setIsError(error as any);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadUsers();
  }, []);

  return { isLoading, setIsLoading, isError, data };
};
