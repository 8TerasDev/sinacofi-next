import React, { useContext, useState } from "react";
import types from "./sinacardheader.module.css";
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
// import { DateRangePicker, LocalizationProvider, SingleInputDateRangeField  } from '@mui/x-date-pickers-pro';
import SinaText from "../../atoms/SinaText";
import { DeclaracionesContext } from "@/contexts/declaraciones.context";
import { handleDownloadCSV } from "@/lib/utils";
import { DatePicker, Space } from 'antd';

import locale from 'antd/es/date-picker/locale/es_Es';


const { RangePicker } = DatePicker;

export const SinCardHeader = () => {
  const [orden, setOrden] = React.useState<any>(10);
  const { state, loadDeclaracionesByDates } = useContext(DeclaracionesContext);

  const handleChange = (event: SelectChangeEvent) => {
    setOrden(event.target.value);
  };

  const [calendarValue, calendarValueSetter] = useState();

  function dateStringifier(value: any) {
    const response = `${value.$d}`
    return response
  }

  function onChangeCalendar(e: any) {
    calendarValueSetter(e)
    const from = e[0] && dateStringifier(e[0])
    const to = e[1] && dateStringifier(e[1])

    if (from && to) {
      loadDeclaracionesByDates(from, to)
    }
  }

  return (
    <div className={types.cardheader_container}>
      <div className={types.text_container}>
        <SinaText size="l" lineHeight="off" fontWeight={700}>
          DECLARACIONES
        </SinaText>
        <SinaText size="xs" lineHeight="off" spacing="on">
          Lorem ipsum dolor sit amet consectetur.
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
        <RangePicker locale={locale} onCalendarChange={onChangeCalendar} value={calendarValue} />
        <Button
          variant="contained"
          className={types.downloadButton}
          onClick={() => handleDownloadCSV(state.declaraciones)}
        >
          descargar
        </Button>
      </div>
    </div>
  );
};

export default SinCardHeader;
