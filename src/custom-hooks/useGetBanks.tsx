import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const useGetBanks = (load?: any) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getBanks = async () => {
    setIsLoading(true);
    try {
      const config = {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
      const { data } = await axios.get("/api/banks/getBanks", config);
      const dataParsed = JSON.parse(data);
      //console.log(dataParsed)
      setData(dataParsed);
    }
    catch (error) {
      setIsError(error as any);
    }
    finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getBanks();
  }, [])

  return { isLoading, isError, data }
}