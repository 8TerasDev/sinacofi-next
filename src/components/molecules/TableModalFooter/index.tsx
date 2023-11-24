// TableModalButtonControls.tsx
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import React, { useContext } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SinaText from "@/components/atoms/SinaText";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { DeclaracionPDF } from "../PDFViewer";
import { NewDeclaracionesContext } from "@/contexts/new-declaraciones.context";

const TableModalFooter = ({
  onNextDeclaracion,
  onPrevDeclaracion,
  declaracion,
  controlEfectivo,
  beneficiarios,
  handleDelete
}: any) => {
  const {
    firstDeclaracion,
    lastDeclaracion,
  } = useContext(NewDeclaracionesContext);
  const razonSocial = declaracion.bf_data_process_personasjuridicas[0].razon_social;
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        py: 2,
        px: 3,
        zIndex: 5,
      }}
    >
      <Grid item xs={12}>
        <Divider sx={{ m: "2vh 0" }} />
      </Grid>
      <Grid container alignItems="center">
        <Grid item xs={4} container>
          <Button
            startIcon={<ArrowBackIosNewIcon fontSize="small" />}
            sx={{ height: "5vh" }}
            aria-label="anterior"
            disabled={firstDeclaracion}
            onClick={onPrevDeclaracion}
          >
            <SinaText size="xs">Anterior</SinaText>
          </Button>
          <Button
            endIcon={<ArrowForwardIosIcon fontSize="small" />}
            disabled={lastDeclaracion}
            sx={{ height: "5vh" }}
            aria-label="siguiente"
            onClick={onNextDeclaracion}
          >
            <SinaText size="xs">Siguiente</SinaText>
          </Button>
        </Grid>
        <Grid container item xs={8} justifyContent="end">
          <PDFDownloadLink
            document={
              <DeclaracionPDF
                declaracion={declaracion}
                controlEfectivo={controlEfectivo}
                beneficiarios={beneficiarios} />
            }
            fileName={`Declaracion-${razonSocial}.pdf`}>
            <Button
              startIcon={<DownloadIcon color="secondary" />}
              sx={{ height: "4vh", mr: "2vh" }}
              aria-label="descargar"
              variant="contained"
            >
              <SinaText color="white">Descargar declaración</SinaText>
            </Button>
          </PDFDownloadLink>
          <Button
            startIcon={<DeleteOutlineIcon color="secondary" />}
            sx={{ height: "4vh" }}
            aria-label="eliminar"
            variant="contained"
            onClick={handleDelete}
          >
            <SinaText color="white">Eliminar declaración</SinaText>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TableModalFooter;
