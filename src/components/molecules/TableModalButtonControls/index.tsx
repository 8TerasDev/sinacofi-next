// TableModalButtonControls.tsx
import React from 'react';
import { Grid, Button, Divider } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SinaText from '../../atoms/SinaText';

const TableModalButtonControls: React.FC = () => {
  return (
    <Grid container item xs={12} spacing={1} alignItems="end" sx={{p : '0 0 2vh 0'}}>
      <Grid item>
        <Button startIcon={<ArrowBackIosIcon fontSize="small" />} sx={{height: '5vh'}} aria-label="anterior">
          <SinaText size='xs'>Anterior</SinaText>
        </Button>
      </Grid>
      <Grid item>
        <Button endIcon={<ArrowForwardIosIcon fontSize="small" />} sx={{height: '5vh'}} aria-label="siguiente">
          <SinaText size='xs'>Siguiente</SinaText>
        </Button>
      </Grid>
      <Grid item sx={{p: '0 1vw'}}>
      <Divider orientation="vertical" sx={{height:'5vh'}} />
      </Grid>
      <Grid item>
        <Button startIcon={<DownloadIcon color='secondary'/>} sx={{height: '5vh'}} endIcon={<KeyboardArrowDownIcon color='secondary'/>} aria-label="descargar" variant="contained"> 
          <SinaText color='white'>Descargar declaración</SinaText>
        </Button>
      </Grid>
      <Grid item>
        <Button startIcon={<DeleteOutlineIcon color='secondary'/>} sx={{height: '5vh'}} aria-label="eliminar" variant="contained">
          <SinaText color='white'>Eliminar declaración</SinaText>
        </Button>
      </Grid>
    </Grid>
  );
};

export default TableModalButtonControls;
