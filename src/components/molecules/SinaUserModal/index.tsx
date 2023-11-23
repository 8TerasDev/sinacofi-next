import React, { useEffect, useState } from "react";
import { Modal, IconButton, Button, TextField } from "@mui/material";
import styles from "./modalappbar.module.css";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import SinaText from "../../atoms/SinaText";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";
import axios from "axios";

interface UserModalProps {
  isOpen: boolean;
  handleClick: () => void;
  data: any;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, handleClick, data }) => {
  const router = useRouter();
  const { name, lastName, email, bank } = data;

  const handleLogout = async () => {
    try {
      const config = {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
      await axios.post("api/auth/logout", config);
      router.push(`/`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClick}>
      <div className={styles.modalWrapper}>
        <div className={styles.modalHeader}>
          <IconButton onClick={handleClick} className={styles.closeButton}>
            <CloseIcon style={{ fill: "#D9D9D9" }} />
          </IconButton>
          <Button
            startIcon={<LogoutIcon style={{ fill: "#D9D9D9" }} />}
            className={styles.logOutButton}
            onClick={handleLogout}
          >
            <SinaText color='white' size='xs'>
              Salir
            </SinaText>
          </Button>
        </div>
        <div className={styles.modal_content}>
          <div className={styles.profileSection}>
            <img
              className={styles.profileImage}
              src='https://placehold.co/140x140'
              alt=''
            />
            <div className={styles.profileText}>
              <SinaText size='sm' color='var(--gray-text)' lineHeight='off'>
                Mi Perfil
              </SinaText>
              <SinaText size='mWide' lineHeight='off'>
                {name}
              </SinaText>
            </div>
          </div>
          <SinaText size='xsWide'>Datos Personales</SinaText>
          <form className={styles.formData}>
            <TextField
              label='Nombre(s)'
              variant='standard'
              value={name}
              disabled
            />
            <TextField
              label='Apellido(s)'
              variant='standard'
              value={lastName}
              disabled
            />
            <TextField
              label='Email'
              variant='standard'
              value={email}
              disabled
            />
            <TextField
              label='Número de Teléfono'
              variant='standard'
              placeholder='+56 9 XXXX XXXX'
              value='+54 9 123456789'
              disabled
            //TODO: Add input mask for formatting (needs an additional library or custom code)
            />
          </form>
          <SinaText size='xsWide'>Institución</SinaText>
          <form className={styles.formData}>
            <TextField
              label='Banco'
              variant='standard'
              value='Santander'
              disabled
            />
            <TextField
              label='Código del Banco'
              variant='standard'
              value='0026'
              disabled
            />
            <TextField
              label='Teléfono Sucursal'
              variant='standard'
              value='123456789'
              disabled
            />
          </form>
        </div>
        <div className={styles.footerText}>
          <SinaText size='xs'>
            Necesitas ayuda? Contáctate con{" "}
            <a href='mailto:helpme@sinacofi.com'>helpme@sinacofi.com</a>
          </SinaText>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
