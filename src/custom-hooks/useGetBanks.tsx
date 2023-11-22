import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const useGetBanks = (load?:any) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getUsers = async () => {
    setIsLoading(true);
    try{
      const { data } = await axios.get("/api/banks/getBanks");
      const dataParsed = JSON.parse(data);
      //console.log(dataParsed)
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
    if(!load){
      getUsers();
    }
    
  },[load])

  return {isLoading, isError, data}
}