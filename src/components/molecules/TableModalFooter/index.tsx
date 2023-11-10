// TableModalButtonControls.tsx
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SinaText from "@/components/atoms/SinaText";

const TableModalFooter = ({ onNextDeclaracion, onPrevDeclaracion }: any) => {
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
            onClick={onPrevDeclaracion}
          >
            <SinaText size="xs">Anterior</SinaText>
          </Button>
          <Button
            endIcon={<ArrowForwardIosIcon fontSize="small" />}
            sx={{ height: "5vh" }}
            aria-label="siguiente"
            onClick={onNextDeclaracion}
          >
            <SinaText size="xs">Siguiente</SinaText>
          </Button>
        </Grid>
        <Grid container item xs={8} justifyContent="end">
          <Button
            startIcon={<DownloadIcon color="secondary" />}
            sx={{ height: "4vh", mr: "2vh" }}
            aria-label="descargar"
            variant="contained"
          >
            <SinaText color="white">Descargar declaración</SinaText>
          </Button>
          <Button
            startIcon={<DeleteOutlineIcon color="secondary" />}
            sx={{ height: "4vh" }}
            aria-label="eliminar"
            variant="contained"
          >
            <SinaText color="white">Eliminar declaración</SinaText>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TableModalFooter;
