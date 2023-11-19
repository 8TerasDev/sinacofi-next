import React, { useContext, useState } from "react";
import types from "./sinacardheader.module.css";
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
// import { DateRangePicker, LocalizationProvider, SingleInputDateRangeField  } from '@mui/x-date-pickers-pro';
import SinaText from "../../atoms/SinaText";
import { DeclaracionesContext } from "@/contexts/declaraciones.context";
import { handleDownloadCSV } from "@/lib/utils";
import { DatePicker, Space } from 'antd';
import { NewDeclaracionesContext } from "@/contexts/new-declaraciones.context";

// import locale from 'antd/es/date-picker/locale/es_Es';


const { RangePicker } = DatePicker;

export const SinCardHeader = () => {
  const [orden, setOrden] = React.useState<any>(10);
  const { FilterByLastUpdated, FilterByLastUploaded, resetFilter, FilterByDateRange } = useContext(NewDeclaracionesContext)


  const handleChange = (event: SelectChangeEvent) => {
    setOrden(event.target.value);
  };

  const [calendarValue, calendarValueSetter] = useState();

  function dateStringifier(value: any) {
    const response = `${value.$d}`
    return response
  }

  function onChangeCalendar(e: any) {
    if (!e) { resetFilter() }
    calendarValueSetter(e)
    let from = e[0] && dateStringifier(e[0])
    let to = e[1] && dateStringifier(e[1])
    if (from && to) {
      FilterByDateRange({
        fechaInicio: from,
        fechaFin: to
      })
    }
  }

  const [filterDeclaraciones, filterDeclaracionesBySetter] = useState<any>(1);


  async function filterDeclaracionesBy({ target }: any) {
    filterDeclaracionesBySetter(target.value)
    if (target.value === 1) {
      resetFilter();
    }
    if (target.value === 2) {
      FilterByLastUpdated();
    }
    if (target.value === 3) {
      FilterByLastUploaded();
    }
  }

  return (
    <div className={types.cardheader_container}>
      <div className={types.text_container}>
        <SinaText size="l" lineHeight="off" fontWeight={700}>
          DECLARACIONES
        </SinaText>
      </div>
      <div className={types.calendar_container}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Mostrar</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={`${filterDeclaraciones}`}
            label="Mostrar"
            onChange={filterDeclaracionesBy}
          >
            <MenuItem value={1}>Totalidad</MenuItem>
            <MenuItem value={2}>Última Actualización</MenuItem>
            <MenuItem value={3}>Última Declaración</MenuItem>
          </Select>
        </FormControl>
        <RangePicker onCalendarChange={onChangeCalendar} value={calendarValue} />
        <Button
          variant="contained"
          className={types.downloadButton}
        // onClick={() => handleDownloadCSV(state.declaraciones)}
        >
          descargar
        </Button>
      </div>
    </div>
  );
};

export default SinCardHeader;
