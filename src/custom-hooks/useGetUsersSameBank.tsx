import axios from "@/common/http-client";
import React, { useEffect, useState } from "react";

export const useGetUsersSameBank = (load?: any) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/users/getUsersSameBank");
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

  return { isLoading, setIsLoading, isError, data };
};
