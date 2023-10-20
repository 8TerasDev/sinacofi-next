// TableModalButtonControls.tsx
import React from "react";
import { Grid } from "@mui/material";
import SinaText from "../../atoms/SinaText";

const TableModalDetails: React.FC = () => {
  const objeto = {
    rut:"22.111.333-2",
    domicilio:"Av. La Paz 999, Recoleta",
    telefono:"+56 9 1234 5678",
    ciudad:"Santiago",
    constitucion:"Chile",
    nombreRep:"Ana Maria Perez Suarez",
    rutRep:"15.384.123-4",
    tipo:"Colectiva",
    fecha:"23/09/2023",
    hora:"09:26"
  };
  return (
    <Grid container spacing={2} direction='column' alignItems='flex-start'>
      { /* Los items ahora ocupan toda la anchura disponible, xs={12} */}
      <Grid item xs={6}>
        <SinaText size='xsWide'>RUT/N Identificación</SinaText>
        <SinaText size='sm'>{objeto.rut}</SinaText>
      </Grid>
      <Grid item xs={6}>
        <SinaText size='xsWide'>Domicilio</SinaText>
        <SinaText size='sm'>{objeto.domicilio}</SinaText>
      </Grid>
      <Grid item xs={6}>
        <SinaText size='xsWide'>Teléfono</SinaText>
        <SinaText size='sm'>{objeto.telefono}</SinaText>
      </Grid>
      <Grid item xs={6}>
        <SinaText size='xsWide'>Ciudad</SinaText>
        <SinaText size='sm'>{objeto.ciudad}</SinaText>
      </Grid>
      <Grid item xs={6}>
        <SinaText size='xsWide'>Constitución</SinaText>
        <SinaText size='sm'>{objeto.constitucion}</SinaText>
      </Grid>
      <Grid item xs={6}>
        <SinaText size='xsWide'>Nombre Rep. Legal</SinaText>
        <SinaText size='sm'>{objeto.nombreRep}</SinaText>
      </Grid>
      <Grid item xs={6}>
        <SinaText size='xsWide'>RUT Rep. Legal</SinaText>
        <SinaText size='sm'>{objeto.rutRep}</SinaText>
      </Grid>
      <Grid item xs={6}>
        <SinaText size='xsWide'>Tipo de Sociedad</SinaText>
        <SinaText size='sm'>{objeto.tipo}</SinaText>
      </Grid>
      <Grid item xs={6}>
        <SinaText size='xsWide'>Fecha y hora de carga</SinaText>
        <SinaText size='sm'>{objeto.fecha} - {objeto.hora}</SinaText>
      </Grid>
    </Grid>
  );
};

export default TableModalDetails;
