import React, { useContext } from "react";
import types from "./sinacardheader.module.css";
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SinaText from "../../atoms/SinaText";
import { handleDownloadCSV } from "@/lib/utils";
import { DeclaracionesContext } from "@/contexts/declaraciones.context";


const SinCardHeader = () => {
  const [orden, setOrden] = React.useState<any>(10);
  const { state } = useContext(DeclaracionesContext);
  const handleChange = (event: SelectChangeEvent) => {
    setOrden(event.target.value);
  };
  return (
    <div className={types.cardheader_container}>
      <div className={types.text_container}>
        <SinaText size="l" font="Gilbert" lineHeight="off">
          Declaraciones
        </SinaText>
      </div>
      <div className={types.calendar_container}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Mostrar</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={`${orden}`}
            label="Mostrar"
            onChange={handleChange}
          >
            <MenuItem value={10}>Totalidad</MenuItem>
            <MenuItem value={20}>Última Actualización</MenuItem>
            <MenuItem value={30}>Última Declaración</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Rango de Fecha" disableFuture />
        </LocalizationProvider>
        <Button
          variant="contained"
          className={types.downloadButton}
          onClick={()=>handleDownloadCSV(state.declaraciones)}
        >
          descargar
        </Button>
      </div>
    </div>
  );
};

export default SinCardHeader;
