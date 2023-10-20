import React from 'react';
import { Modal, IconButton, Button, TextField } from '@mui/material';
import styles from './modalappbar.module.css';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import SinaText from '../../atoms/SinaText';

interface UserModalProps {
  isOpen: boolean;
  handleClick: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, handleClick }) => {
  return (
    <Modal open={isOpen} onClose={handleClick}>
        <div className={styles.modalWrapper}>
    <div className={styles.modalHeader}>
      <IconButton onClick={handleClick} className={styles.closeButton}><CloseIcon style={{ fill: '#D9D9D9' }} /></IconButton>
      <Button startIcon={<LogoutIcon style={{ fill: '#D9D9D9' }} />} className={styles.logOutButton}>
        <SinaText color='white' size='xs'>Salir</SinaText>
      </Button>
    </div>
    <div className={styles.modal_content}>
      <div className={styles.profileSection}>
        <img
          className={styles.profileImage}
          src="https://placehold.co/140x140"
          alt=""
        />
        <div className={styles.profileText}>
          <SinaText size='sm' color='var(--gray-text)' lineHeight='off'>Mi Perfil</SinaText>
          <SinaText size='mWide' lineHeight='off'>Juan Pablo</SinaText>
        </div>
      </div>
      <SinaText size='xsWide'>Datos Personales</SinaText>
      <form className={styles.formData}>
        <TextField label="Nombre(s)" variant="standard" />
        <TextField label="Apellido(s)" variant="standard" />
        <TextField label="Email" variant="standard" />
        <TextField
          label="Número de Teléfono"
          variant="standard"
          placeholder="+56 9 XXXX XXXX"
        //TODO: Add input mask for formatting (needs an additional library or custom code)
        />
      </form>
      <SinaText size='xsWide'>Institución</SinaText>
      <form className={styles.formData}>

        <TextField label="Banco" variant="standard" />
        <TextField label="Código del Banco" variant="standard" />
        <TextField label="Teléfono Sucursal" variant="standard" />
      </form>
    </div>
    <div className={styles.footerText}>
      <SinaText size='xs'>Necesitas ayuda? Contáctate con <a href="mailto:helpme@sinacofi.com">helpme@sinacofi.com</a></SinaText>
    </div>
  </div>
    </Modal>
  );
};

export default UserModal;
