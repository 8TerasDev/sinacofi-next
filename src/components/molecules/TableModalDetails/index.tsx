// TableModalButtonControls.tsx
import React from "react";
import { Grid, Skeleton, Stack } from "@mui/material";
import SinaText from "../../atoms/SinaText";
import { BfDataProcessDeclaraciones, PJuridicas } from "@/application";
import dayjs from "dayjs";
function formatISODateToDateTime(isoString: any) {
  // Crear un objeto Date con la cadena ISO
  const date = new Date(isoString);

  // Función para agregar un cero al inicio si el número es menor que 10
  const pad = (number: number) => (number < 10 ? `0${number}` : number);

  // Formatear la fecha y el tiempo en el formato deseado
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
}
const TableModalDetails = ({
  declaracion,
  isLoading,
}: {
  declaracion: BfDataProcessDeclaraciones | null;
  isLoading: boolean;
}) => {
  const rut_no = declaracion?.bf_data_process_personasjuridicas?.[0]?.rut;
  const domicilio =
    declaracion?.bf_data_process_personasjuridicas?.[0]?.domicilio;
  const telefono =
    declaracion?.bf_data_process_personasjuridicas?.[0]?.telefono;
  const ciudad = declaracion?.bf_data_process_personasjuridicas?.[0]?.ciudad;
  const lugar_de_constitucion =
    declaracion?.bf_data_process_personasjuridicas?.[0]?.lugar_de_constitucion;
  const nombre_rep_legal =
    declaracion?.bf_data_process_personasjuridicas?.[0]?.nombre_rep_legal;
  const tipo_sociedad =
    declaracion?.bf_data_process_personasjuridicas?.[0]?.tipo_de_sociedad;
  const fechahora_creacion =
    declaracion?.bf_data_process_personasjuridicas?.[0]?.created_at;
  const rutRep =
    declaracion?.bf_data_process_personasjuridicas?.[0]
      ?.identificacion_rep_legal;
  return (
    <Grid container direction='column' alignItems='flex-start'>
      {/* Los items ahora ocupan toda la anchura disponible, xs={12} */}
      <Grid item xs={6} paddingBottom='10px'>
        <Stack paddingBottom={"3px"}>
          <SinaText size='xxs' fontWeight={700}>
            RUT/N Identificación
          </SinaText>
        </Stack>
        <SinaText size='xs'>{isLoading ? <Skeleton /> : rut_no}</SinaText>
      </Grid>
      <Grid item xs={6} paddingBottom='10px'>
        <SinaText size='xxs' fontWeight={700}>
          Domicilio
        </SinaText>
        <SinaText size='xs'>{isLoading ? <Skeleton /> : domicilio}</SinaText>
      </Grid>
      <Grid item xs={6} paddingBottom='10px'>
        <SinaText size='xxs' fontWeight={700}>
          Teléfono
        </SinaText>
        <SinaText size='xs'>{isLoading ? <Skeleton /> : telefono}</SinaText>
      </Grid>
      <Grid item xs={6} paddingBottom='10px'>
        <SinaText size='xxs' fontWeight={700}>
          Ciudad
        </SinaText>
        <SinaText size='xs'>{isLoading ? <Skeleton /> : ciudad}</SinaText>
      </Grid>
      <Grid item xs={6} paddingBottom='10px'>
        <SinaText size='xxs' fontWeight={700}>
          Constitución
        </SinaText>
        <SinaText size='xs'>
          {isLoading ? <Skeleton /> : lugar_de_constitucion}
        </SinaText>
      </Grid>
      <Grid item xs={6} paddingBottom='10px'>
        <SinaText size='xxs' fontWeight={700}>
          Nombre Rep. Legal
        </SinaText>
        <SinaText size='xs'>
          {isLoading ? <Skeleton /> : nombre_rep_legal}
        </SinaText>
      </Grid>
      <Grid item xs={6} paddingBottom='10px'>
        <SinaText size='xxs' fontWeight={700}>
          RUT Rep. Legal
        </SinaText>
        <SinaText size='xs'>{isLoading ? <Skeleton /> : rutRep}</SinaText>
      </Grid>
      <Grid item xs={6} paddingBottom='10px'>
        <SinaText size='xxs' fontWeight={700}>
          Tipo de Sociedad
        </SinaText>
        <SinaText size='xs'>
          {isLoading ? <Skeleton /> : tipo_sociedad}
        </SinaText>
      </Grid>
      <Grid item xs={6} paddingBottom='10px'>
        <SinaText size='xxs' fontWeight={700}>
          Fecha de carga
        </SinaText>
        <SinaText size='xs'>
          {isLoading ? (
            <Skeleton />
          ) : (
            `${dayjs(fechahora_creacion).format("DD/MM/YYYY hh:mm")}`
          )}
        </SinaText>
      </Grid>
    </Grid>
  );
};

export default TableModalDetails;
