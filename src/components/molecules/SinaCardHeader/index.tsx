import React from "react";
import types from "./sinacardheader.module.css";
import { Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SinaText from "../../atoms/SinaText";


const SinCardHeader = () => {
  return (
    <div className={types.cardheader_container}>
      <div className={types.text_container}>
        <SinaText size="l" font="Gilbert" lineHeight="off">
          Declaraciones
        </SinaText>
        <SinaText lineHeight="off" spacing="on" color="var(--gray-text)">
          Lorem ipsum dolor sit amet consectetur.
        </SinaText>
      </div>
      <div className={types.calendar_container}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Rango de Fecha" disableFuture/>
        </LocalizationProvider>
        <Button
          variant="contained"
        >
          descargar lista en csv
        </Button>
      </div>
    </div>
  );
};

export default SinCardHeader;
