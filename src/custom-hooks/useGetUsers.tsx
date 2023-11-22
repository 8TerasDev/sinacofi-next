import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const useGetUsers = (load?:any) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getUsers = async () => {
    setIsLoading(true);
    try{
      const { data } = await axios.get("/api/users/getUsers",{
        headers:{
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      });
      const dataParsed = JSON.parse(data);
      setData(dataParsed);
    }
    catch(error){
      console.log(error)
      setIsError(error as any);
    }
    finally{
      setIsLoading(false);
    }
  }
  useEffect(()=>{
      getUsers();
  },[])

  return {isLoading, isError, data}
}