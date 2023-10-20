// TableModalButtonControls.tsx
import React from 'react';
import { Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const TableModalCloseButton: React.FC<{isOpen: boolean, handleClose: () => void}> = ({ isOpen, handleClose }) => {
  return (
    <Grid container item xs={12} sx={{p : '0 0 2vh 0'}}>
      <Grid item>
        <IconButton onClick={handleClose} sx={{height: '5vh', width: '5vh'}} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
};

export default TableModalCloseButton