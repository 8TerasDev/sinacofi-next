import React from 'react';
import { Grid, Divider } from '@mui/material';
import SinaText from '../../atoms/SinaText';

const TableModalAccordionDetails: React.FC = () => {
  const registros = [
    {
      nombre: 'Amelia Javiera Martinez Salgado',
      rut: '15.384.123-4',
      participacion: '50%',
    },
    {
      nombre: 'Amelia Javiera Martinez Salgado',
      rut: '15.384.123-4',
      participacion: '50%',
    },
    {
      nombre: 'Amelia Javiera Martinez Salgado',
      rut: '15.384.123-4',
      participacion: '50%',
    },
  ];

  return (
    <>
      {registros.map((registro, index) => (
        <React.Fragment key={index}>
          <Grid container spacing={2} sx={{p:'0 1vw'}}>
            {/* Primera fila */}
            <Grid item xs={5}>
              <SinaText color='var(--gray-text)' size="xxs">
                Nombre Completo
              </SinaText>
              <SinaText size="xs">
                {registro.nombre}
              </SinaText>
            </Grid>

            <Grid item xs={3}>
              <SinaText color='var(--gray-text)' size="xxs">
                RUT / Identificación
              </SinaText>
              <SinaText size="xs">
                {registro.rut}
              </SinaText>
            </Grid>

            <Grid item xs={4}>
              <SinaText color='var(--gray-text)' size="xxs">
                Participación
              </SinaText>
              <SinaText size="xs">
                {registro.participacion}
              </SinaText>
            </Grid>
          </Grid>

          {/* Render Divider if it's not the last item */}
          {index !== registros.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </>
  );
}

export default TableModalAccordionDetails;
