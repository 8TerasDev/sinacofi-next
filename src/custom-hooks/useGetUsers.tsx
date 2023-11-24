import axios from "@/common/http-client";
import React, { useEffect, useState } from "react";

export const useGetUsers = (load?: any) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getUsers = async () => {
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
    getUsers();
  }, []);

  return { isLoading, isError, data };
};
