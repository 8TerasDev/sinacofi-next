import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const useGetProfile = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getProfile = async () => {
    setIsLoading(true);
    try {
      const config = {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
      const { data } = await axios.get("/api/auth/getprofile",config);
      setData(data.user);
    }
    catch (error) {
      setIsError(error as any);
    }
    finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getProfile();
  }, [])

  return { isLoading, isError, data }
}