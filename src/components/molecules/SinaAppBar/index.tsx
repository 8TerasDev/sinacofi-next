import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./sinaappbar.module.css";
import { Button, Stack } from "@mui/material";
import sinacofi_logo from "../../../assets/images/sinacofi_logo.png";
import { Person } from "@mui/icons-material";
import axios from '@/common/http-client';

const SinaAppBar = ({handleAdmin}: any) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isBankAdmin, setIsBankAdmin] = useState(false);
  // const BANK_ADMIN_URL = isBankAdmin ? '/bankadmin' : '';
  const ADMIN_URL = isAdmin ? '/admin' : ''; 
  //const URL = `${BANK_ADMIN_URL}${ADMIN_URL}`;

  const URL: () => string = () => {
    if(isAdmin) return '/admin';
    if(isBankAdmin) return '/bankadmin';
    return '';
  }

  const getProfile = async () => {
    try {
      const config = {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
      const { data } = await axios.get("/api/auth/getprofile", config);
      setIsAdmin(data.user.isAdmin);
      setIsBankAdmin(data.user.isBankAdmin)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProfile();
  }, [])

  return (
    <div className={styles.sinappbar_container}>
      {(isAdmin || isBankAdmin) &&
        <Stack padding={'5px'}>
          <Button
            startIcon={<Person />}
            onClick={()=>handleAdmin(URL())} variant="contained" color="success">
            Administrador
          </Button>
        </Stack>
      }
      <Stack alignItems={'flex-end'} width={'100%'}>
        <Image src={sinacofi_logo} alt="" width={180} />
      </Stack>
    </div>
  );
};

export default SinaAppBar;
