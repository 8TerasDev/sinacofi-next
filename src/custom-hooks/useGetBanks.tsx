import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const useGetBanks = (load:any) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getUsers = async () => {
    setIsLoading(true);
    try{
      const { data } = await axios.get("/api/banks/getBanks");
      console.log('inside',data);
      const dataParsed = JSON.parse(data);
      setData(dataParsed);
    }
    catch(error){
      setIsError(error as any);
    }
    finally{
      setIsLoading(false);
    }
  }
  useEffect(()=>{
    getUsers();
  },[load])

  return {isLoading, isError, data}
}