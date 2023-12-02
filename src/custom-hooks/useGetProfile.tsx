import axios from "@/common/http-client";
import React, { useEffect, useState } from "react";

export const useGetProfile = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const loadProfile = async () => {
    console.time("Loan profile");
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/auth/getprofile");
      setData(data.user);
    } catch (error) {
      setIsError(error as any);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadProfile();
  }, []);

  return { isLoading, isError, data };
};
