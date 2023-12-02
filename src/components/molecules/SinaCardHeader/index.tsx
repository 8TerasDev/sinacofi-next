import React, { useContext, useState } from "react";
import types from "./sinacardheader.module.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import SinaText from "../../atoms/SinaText";
import { handleDownloadCSV } from "@/lib/utils";
import { ConfigProvider, DatePicker } from "antd";
import { NewDeclaracionesContext } from "@/contexts/new-declaraciones.context";
import dayjs from "dayjs";
import "dayjs/locale/es";
import ES from "antd/locale/es_ES";

dayjs.locale("es");
const dateFormat = "DD/MM/YYYY/";
const { RangePicker } = DatePicker;

export const SinCardHeader = () => {
  const { setFilters, pageData, setOrders } = useContext(
    NewDeclaracionesContext
  );
  const [calendarValue, calendarValueSetter] = useState();

  function onChangeCalendar(e: any) {
    if (!e) {
      setFilters({ fecha_declaracion: undefined });
    }
    calendarValueSetter(e);
    let from = e[0];
    let to = e[1];
    if (from && to) {
      const formatDate = "YYYY-MM-DD";
      setFilters({
        fecha_declaracion: [from.format(formatDate), to.format(formatDate)],
      });
    }
  }
  const [filterDeclaraciones, filterDeclaracionesBySetter] = useState<any>(1);

  async function filterDeclaracionesBy({ target }: any) {
    filterDeclaracionesBySetter(target.value);
    if (target.value === 1) {
      setOrders({});
    }
    if (target.value === 2) {
      setOrders({ fecha_subida: "desc" });
    }
    if (target.value === 3) {
      setOrders({ fecha_declaracion: "desc" });
    }
  }

  return (
    <div className={types.cardheader_container}>
      <div className={types.text_container}>
        <SinaText size='l' lineHeight='off' fontWeight={700}>
          DECLARACIONES
        </SinaText>
      </div>
      <div className={types.calendar_container}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Mostrar</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={`${filterDeclaraciones}`}
            label='Mostrar'
            onChange={filterDeclaracionesBy}
          >
            <MenuItem value={1}>Totalidad</MenuItem>
            <MenuItem value={2}>Última Actualización</MenuItem>
            <MenuItem value={3}>Última Declaración</MenuItem>
          </Select>
        </FormControl>
        <ConfigProvider locale={ES}>
          <RangePicker
            format={dateFormat}
            onCalendarChange={onChangeCalendar}
            value={calendarValue}
          />
        </ConfigProvider>

        <Button
          variant='contained'
          className={types.downloadButton}
          onClick={() => handleDownloadCSV(pageData.items)}
        >
          descargar
        </Button>
      </div>
    </div>
  );
};

export default SinCardHeader;
