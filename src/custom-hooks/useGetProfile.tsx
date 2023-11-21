import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const useGetProfile = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getProfile = async () => {
    setIsLoading(true);
    try{
      const { data } = await axios.get("/api/auth/getprofile");
      setData(data.user);
    }
    catch(error){
      setIsError(error as any);
    }
    finally{
      setIsLoading(false);
    }
  }
  useEffect(()=>{
    getProfile();
  },[])

  return {isLoading, isError, data}
}