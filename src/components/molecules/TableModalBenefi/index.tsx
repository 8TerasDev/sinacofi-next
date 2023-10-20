// TableModalBenefi.tsx
import React from 'react';
import { Grid, Button } from '@mui/material';
import SinaText from '../../atoms/SinaText';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';


const TableModalBenefi: React.FC = () => {
  return (
    <Grid container xs={12} alignItems="center">
      <Grid item xs={6}>
      <SinaText size='xsWide' spacing='on'>Beneficiarios Finales</SinaText>
      </Grid>
      <Grid item xs={6}>
      <Button endIcon={<DownloadOutlinedIcon/>} variant='outlined'>Descargar Lista</Button>
      </Grid>
    </Grid>
  );
};

export default TableModalBenefi;
