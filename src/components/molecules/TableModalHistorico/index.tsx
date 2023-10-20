// TableModalControl.tsx
import React from 'react';
import { Button, Grid } from '@mui/material';
import SinaText from '../../atoms/SinaText';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';

const TableModalHistorico: React.FC = () => {
  return (
    <Grid container xs={12} alignItems="center">
      <Grid item xs={6}>
      <SinaText size='xsWide' spacing='on'>Histórico</SinaText>
      </Grid>
      <Grid item xs={6}>
      <Button endIcon={<DownloadOutlinedIcon/>} variant='outlined'>Descargar Lista</Button>
      </Grid>
    </Grid>
  );
};

export default TableModalHistorico;
