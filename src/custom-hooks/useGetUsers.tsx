import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const useGetUsers = (load:any) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getUsers = async () => {
    setIsLoading(true);
    try{
      const { data } = await axios.get("/api/users/getUsers");
      const dataParsed = JSON.parse(data);
      console.log('users',dataParsed)
      setData(dataParsed);
    }
    catch(error){
      console.log(error)
      setIsError(error as any);
    }
    finally{
      console.log('done')
      setIsLoading(false);
    }
  }
  useEffect(()=>{
    getUsers();
  },[load])

  return {isLoading, isError, data}
}