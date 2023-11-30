"use-client";

import { BfDataProcessDeclaraciones, PJuridicas } from "@/application";
import { pbkdf2Sync, randomBytes } from "crypto";
import dayjs from "dayjs";
// export const convertDate = (date: string | Date) => {
//   const newDate = new Date(date);
//   const day = newDate.getDate();
//   const month = newDate.getMonth() + 1;
//   const year = newDate.getFullYear();
//   return `${day}/${month}/${year}`;
// };

export const compareFechaHoraCreacion = (
  a: PJuridicas,
  b: PJuridicas,
  direction: "asc" | "desc"
) => {
  if (a.fechahora_creacion! < b.fechahora_creacion!) {
    return direction === "asc" ? -1 : 1;
  }
  if (a.fechahora_creacion! > b.fechahora_creacion!) {
    return direction === "asc" ? 1 : -1;
  }
  return 0;
};

export const compareFechaEnvioArchivo = (
  a: PJuridicas,
  b: PJuridicas,
  direction: "asc" | "desc"
) => {
  if (a.fecha_envio_archivo! < b.fecha_envio_archivo!) {
    return direction === "asc" ? -1 : 1;
  }
  if (a.fecha_envio_archivo! > b.fecha_envio_archivo!) {
    return direction === "asc" ? 1 : -1;
  }
  return 0;
};

const createCSV = (data: any) => {
  const keys = Object.keys(data[0]);
  let final = "";
  for (let i = 0; i < data.length + 1; i++) {
    keys.forEach((key) => {
      if (i === 0) {
        final = final + `${key},`;
      } else {
        final = final + `${data[i - 1][key]},`;
      }
    });
    final = final.slice(0,-1) + "\n";
  }
  return final;
};

export const createNewKindCSV = (data: any) => {
  const {
    bf_data_process_beneficiariosfinales,
    bf_data_process_personasjuridicas,
    codigo_banco,
    fecha_subida,
    num_declaracion,
    correlativo
  } = data;
  const {
    rut, 
    razon_social, 
    domicilio, 
    lugar_de_constitucion, 
    ciudad,
    nombre_rep_legal,
    tipo_de_sociedad,
    telefono,
    identificacion_rep_legal,
  } = bf_data_process_personasjuridicas[0];

    const firstLine = `PJ;\
      ${rut};\
      ${razon_social};\
      ${domicilio};\
      ${lugar_de_constitucion};\
      ${ciudad};\
      ${telefono};\
      ${identificacion_rep_legal};\
      ${nombre_rep_legal};\
      ${tipo_de_sociedad};\
      ${tipo_de_sociedad};\
      ${codigo_banco};\
      ${fecha_subida};\
      ${num_declaracion};\
      \n
    `;

    const BF_CE_Lines = bf_data_process_beneficiariosfinales.map( (item:any) => {
      const {
        tipo, 
        identificacion, 
        nombre_completo, 
        domicilio:domicilio2,
        ciudad:ciudad2,
        pais,
        participacion,
      } = item;
      return `
        ${tipo};\
        ${identificacion};\
        ${nombre_completo};\
        ${domicilio2};\
        ${ciudad2};\
        ${pais};\
        ${correlativo};\
        ${participacion};\
        ${rut};\
        ${codigo_banco};\
        ${num_declaracion};\
        \n`;
    })

    return firstLine+BF_CE_Lines;
}

export const handleDownloadCSV = (data: any, type?:any) => {
  const isDeclaracion = type === 'declaracion';
  const filename = isDeclaracion ? `declaracion_${data.num_declaracion}.csv` : 'declaracaiones.csv'; 
  const newDataMap = !isDeclaracion && data.map((declaracion:any) => {
    return {
      id: declaracion.id,
      codigo_banco: declaracion.codigo_banco,
      num_declaracion: declaracion.num_declaracion,
      razon_social: declaracion.bf_data_process_personasjuridicas[0].razon_social,
      fecha_declaracion: dayjs(declaracion.fecha_declaracion).format("DD/MM/YYYY"),
      fecha_subida: dayjs(declaracion.fecha_subida).format("DD/MM/YYYY"),  
    };
  });
  const csvData = newDataMap ? createCSV(newDataMap) : createNewKindCSV(data);
  const blob = new Blob([csvData], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", filename);
  a.click();
  a.remove();
};

export const encryption = (input: string) => {
  const randomKey = randomBytes(22).toString("base64");
  const encrypt = pbkdf2Sync(input, randomKey, 600000, 32, "sha256");
  const encryptedInput = `pbkdf2_sha256$600000$${randomKey}$${encrypt.toString(
    "base64"
  )}`;
  return encryptedInput;
};


