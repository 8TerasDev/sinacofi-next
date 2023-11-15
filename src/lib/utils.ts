'use-client'

import { PJuridicas } from "@/application";

export const convertDate = ( date: string | Date) => {
  const newDate = new Date(date);
  const day = newDate.getDay()+1;
  const month = newDate.getMonth()+1;
  const year = newDate.getFullYear();
  return `${day}-${month}-${year}`;
}

export const compareFechaHoraCreacion = (a: PJuridicas, b: PJuridicas, direction: 'asc' | 'desc') => {
  if (a.fechahora_creacion! < b.fechahora_creacion!) {
      return direction === 'asc' ? -1 : 1;
  }
  if (a.fechahora_creacion! > b.fechahora_creacion!) {
      return direction === 'asc' ? 1 : -1;
  }
  return 0;
};

export const compareFechaEnvioArchivo = (a: PJuridicas, b: PJuridicas, direction: 'asc' | 'desc') => {
  if (a.fecha_envio_archivo! < b.fecha_envio_archivo!) {
      return direction === 'asc' ? -1 : 1;
  }
  if (a.fecha_envio_archivo! > b.fecha_envio_archivo!) {
      return direction === 'asc' ? 1 : -1;
  }
  return 0;
};

const createCSV = (data:any) => {
  const keys = Object.keys(data[0]);
  let final = "";
  for(let i=0; i < data.length+1; i++){
    keys.forEach( key => {
      if(i===0){
        final = final+`${key},`
      }
      else{
        final = final+`${data[i-1][key]},`
      }
      
    });
    final = final+"\n";
  }
  return final;
}

export const handleDownloadCSV = (data:any) => {
  const csvData = createCSV(data);
  const blob = new Blob([csvData], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href',url);
  a.setAttribute('download', 'declaraciones.csv');
  a.click();
  a.remove();
}
