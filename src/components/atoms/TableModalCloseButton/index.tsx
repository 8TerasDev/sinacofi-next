import React from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const TableModalCloseButton: React.FC<{isOpen: boolean, handleClose: () => void}> = ({ handleClose }) => {
  return (
    <IconButton onClick={handleClose} sx={{height: '5vh', width: '5vh'}} aria-label="close">
      <CloseIcon />
    </IconButton>
  );
};

export default TableModalCloseButton;
