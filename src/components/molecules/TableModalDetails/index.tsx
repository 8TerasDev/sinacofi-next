// TableModalButtonControls.tsx
import React from "react";
import { Grid, Stack } from "@mui/material";
import SinaText from "../../atoms/SinaText";
import { PJuridicas } from "@/application";
function formatISODateToDateTime(isoString: any) {
  // Crear un objeto Date con la cadena ISO
  const date = new Date(isoString);

  // Función para agregar un cero al inicio si el número es menor que 10
  const pad = (number: number) => number < 10 ? `0${number}` : number;

  // Formatear la fecha y el tiempo en el formato deseado
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}
const TableModalDetails = ({ declaracion }: { declaracion: PJuridicas }) => {
  const {
    rut_no: rut,
    domicilio,
    telefono,
    ciudad,
    lugar_de_constitucion: constitucion,
    nombre_rep_legal: nombreRep,
    tipo_sociedad: tipo,
    fechahora_creacion: fecha,
  } = declaracion;
  const rutRep = rut;
  return (
    <Grid container direction="column" alignItems="flex-start">
      {/* Los items ahora ocupan toda la anchura disponible, xs={12} */}
      <Grid item xs={6} paddingBottom='10px'>
        <Stack paddingBottom={'3px'}>
          <SinaText size="xxs" fontWeight={700}>RUT/N Identificación</SinaText>
        </Stack>
          <SinaText size="xs">{rut}</SinaText>
      </Grid>
      <Grid item xs={6} paddingBottom='10px'>
        <SinaText size="xxs" fontWeight={700}>Domicilio</SinaText>
        <SinaText size="xs">{domicilio}</SinaText>
      </Grid>
      <Grid item xs={6} paddingBottom='10px'>
        <SinaText size="xxs" fontWeight={700}>Teléfono</SinaText>
        <SinaText size="xs">{telefono}</SinaText>
      </Grid>
      <Grid item xs={6} paddingBottom='10px'>
        <SinaText size="xxs" fontWeight={700}>Ciudad</SinaText>
        <SinaText size="xs">{ciudad}</SinaText>
      </Grid>
      <Grid item xs={6} paddingBottom='10px'>
        <SinaText size="xxs" fontWeight={700}>Constitución</SinaText>
        <SinaText size="xs">{constitucion}</SinaText>
      </Grid>
      <Grid item xs={6} paddingBottom='10px'>
        <SinaText size="xxs" fontWeight={700}>Nombre Rep. Legal</SinaText>
        <SinaText size="xs">{nombreRep}</SinaText>
      </Grid>
      <Grid item xs={6} paddingBottom='10px'>
        <SinaText size="xxs" fontWeight={700}>RUT Rep. Legal</SinaText>
        <SinaText size="xs">{rutRep}</SinaText>
      </Grid>
      <Grid item xs={6} paddingBottom='10px'>
        <SinaText size="xxs" fontWeight={700}>Tipo de Sociedad</SinaText>
        <SinaText size="xs">{tipo}</SinaText>
      </Grid>
      <Grid item xs={6} paddingBottom='10px'>
        <SinaText size="xxs" fontWeight={700}>Fecha de carga</SinaText>
        <SinaText size="xs">
          {`${formatISODateToDateTime(fecha)}`}
        </SinaText>
      </Grid>
    </Grid>
  );
};

export default TableModalDetails;
