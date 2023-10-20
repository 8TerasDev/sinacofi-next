// TableModalBenefiDetails.tsx
import React from 'react';
import { Divider, Grid } from '@mui/material';
import SinaText from '../../atoms/SinaText';

const TableModalHistoricoDetails: React.FC = () => {
  
  const Registro = {
    nombre:'Amelia Javiera Martinez Salgado',
    rut:'15.384.123-4',
    participacion:'50%',
    domicilio:'Av. La Paz 999, Recoleta',
    ciudad:'Santiago',
    pais:'Chile',
};

  return (
<Grid container spacing={2} xs={12} sx={{mt:'1vh'}}>
      {/* Primera fila */}
      <Grid item xs={5}>
        <SinaText color='var(--gray-text)' size="xxs">
          Nombre Completo
        </SinaText>
        <SinaText size="xs">
          {Registro.nombre}
        </SinaText>
      </Grid>

      <Grid item xs={3}>
        <SinaText color='var(--gray-text)' size="xxs">
          RUT / Identificación
        </SinaText>
        <SinaText size="xs">
          {Registro.rut}
        </SinaText>
      </Grid>

      <Grid item xs={4}>
        <SinaText color='var(--gray-text)' size="xxs">
          Participación
        </SinaText>
        <SinaText size="xs">
          {Registro.participacion}
        </SinaText>
      </Grid>

      {/* Segunda fila */}
      <Grid item xs={5}>
        <SinaText color='var(--gray-text)' size="xxs">
          Domicilio
        </SinaText>
        <SinaText size="xs">
          {Registro.domicilio}
        </SinaText>
      </Grid>

      <Grid item xs={3}>
        <SinaText color='var(--gray-text)' size="xxs">
          Ciudad
        </SinaText>
        <SinaText size="xs">
          {Registro.ciudad}
        </SinaText>
      </Grid>

      <Grid item xs={4}>
        <SinaText color='var(--gray-text)' size="xxs">
          País
        </SinaText>
        <SinaText size="xs">
          {Registro.pais}
        </SinaText>
      </Grid>
      <Divider sx={{width: '110%', mt:'2vh'}}></Divider>
    </Grid>
  );
}

export default TableModalHistoricoDetails;
