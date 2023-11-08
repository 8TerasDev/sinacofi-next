import React from 'react';
import { Grid, Divider } from '@mui/material';
import SinaText from '../../atoms/SinaText';
import { PFinales } from '@/application';

const TableModalAccordionDetails = ({ registros }: { registros: PFinales[] }) => {

  return (
    <>
      {registros.map((registro, index) => (
        <React.Fragment key={index}>
          <Grid container spacing={2} sx={{ p: '0 1vw' }}>
            {/* Primera fila */}
            <Grid item xs={5}>
              <SinaText color='var(--gray-text)' size="xxs">
                Nombre Completo
              </SinaText>
              <SinaText size="xs">
                {registro.nombre_completo}
              </SinaText>
            </Grid>

            <Grid item xs={3}>
              <SinaText color='var(--gray-text)' size="xxs">
                RUT / Identificación
              </SinaText>
              <SinaText size="xs">
                {registro.cni_id_rut_benef_final}
              </SinaText>
            </Grid>

            <Grid item xs={4}>
              <SinaText color='var(--gray-text)' size="xxs">
                Participación
              </SinaText>
              <SinaText size="xs">
                {registro.porc_participacion}
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
