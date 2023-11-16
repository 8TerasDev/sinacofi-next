import React from "react";
import Image from 'next/image'
import styles from "./sinaappbar.module.css";
import { Button, Stack } from "@mui/material";
import sinacofi_logo from '../../../assets/images/sinacofi_logo.png'


const SinaAppBar = ({handleAdmin}) => {
  return (
    <div className={styles.sinappbar_container}>
      {handleAdmin &&       
        <Stack>
          <p>
            Admin User permissions
          </p>
          <Button onClick={handleAdmin}>
            Enter
          </Button>
        </Stack>
      }
      <Image src={sinacofi_logo} alt="" width={180} /> 
    </div>
  );
};

export default SinaAppBar;
