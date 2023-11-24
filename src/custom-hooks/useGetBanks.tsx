import axios from "@/common/http-client";
import  { useEffect, useState } from "react";

export const useGetBanks = (load?: any) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getBanks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/banks/getBanks");
      setData(data);
    } catch (error) {
      setIsError(error as any);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getBanks();
  }, []);

  return { isLoading, isError, data };
};
