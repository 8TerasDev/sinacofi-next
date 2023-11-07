// TableModalButtonControls.tsx
import React from "react";
import { Grid } from "@mui/material";
import SinaText from "../../atoms/SinaText";
import { PJuridicas } from "@/application";
function formatISODateToDateTime(isoString: string) {
  // Crear un objeto Date con la cadena ISO
  const date = new Date(isoString);

  // Función para agregar un cero al inicio si el número es menor que 10
  const pad = (number: number) => number < 10 ? `0${number}` : number;

  // Formatear la fecha y el tiempo en el formato deseado
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}
const TableModalDetails = ({ declaracion }: { declaracion: PJuridicas }) => {
  const objeto = {
    rut: declaracion.rut_no,
    domicilio: declaracion.domicilio,
    telefono: declaracion.telefono,
    ciudad: declaracion.ciudad,
    constitucion: declaracion.lugar_de_constitucion,
    nombreRep: declaracion.nombre_rep_legal,
    rutRep: declaracion.rut_no,
    tipo: declaracion.tipo_sociedad,
    fecha: `${declaracion.fechahora_creacion}`,
    hora: "09:26",
  };
  return (
    <Grid container direction="column" alignItems="flex-start">
      {/* Los items ahora ocupan toda la anchura disponible, xs={12} */}
      <Grid item xs={6}>
        <SinaText size="xsWide">RUT/N Identificación</SinaText>
        <SinaText size="xs">{objeto.rut}</SinaText>
      </Grid>
      <Grid item xs={6}>
        <SinaText size="xsWide">Domicilio</SinaText>
        <SinaText size="xs">{objeto.domicilio}</SinaText>
      </Grid>
      <Grid item xs={6}>
        <SinaText size="xsWide">Teléfono</SinaText>
        <SinaText size="xs">{objeto.telefono}</SinaText>
      </Grid>
      <Grid item xs={6}>
        <SinaText size="xsWide">Ciudad</SinaText>
        <SinaText size="xs">{objeto.ciudad}</SinaText>
      </Grid>
      <Grid item xs={6}>
        <SinaText size="xsWide">Constitución</SinaText>
        <SinaText size="xs">{objeto.constitucion}</SinaText>
      </Grid>
      <Grid item xs={6}>
        <SinaText size="xsWide">Nombre Rep. Legal</SinaText>
        <SinaText size="xs">{objeto.nombreRep}</SinaText>
      </Grid>
      <Grid item xs={6}>
        <SinaText size="xsWide">RUT Rep. Legal</SinaText>
        <SinaText size="xs">{objeto.rutRep}</SinaText>
      </Grid>
      <Grid item xs={6}>
        <SinaText size="xsWide">Tipo de Sociedad</SinaText>
        <SinaText size="xs">{objeto.tipo}</SinaText>
      </Grid>
      <Grid item xs={6}>
        <SinaText size="xsWide">Fecha y hora de carga</SinaText>
        <SinaText size="xs">
          {`${formatISODateToDateTime(objeto.fecha)}`}
        </SinaText>
      </Grid>
    </Grid>
  );
};

export default TableModalDetails;
