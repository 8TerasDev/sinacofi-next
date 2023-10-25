import React from "react";
import { Divider, Grid, Modal, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TableModalTitle from "../../molecules/TableModalTitle";
import TableModalDetails from "../../molecules/TableModalDetails";
import TableModalBenefi from "../../molecules/TableModalBenefi";
import TableModalControl from "../../molecules/TableModalControl";
import TableModalBenefiDetails from "../../molecules/TableModalBenefiDetails";
import TableModalControlDetails from "../../molecules/TableModalControlDetails";
import { Registro } from "../../organisms/SinaTable";
import TableModalHistoricoDetails from "../../molecules/TableModalHistoricoDetails";
import TableModalHistorico from "../../molecules/TableModalHistorico";
import TableModalCloseButton from "../../atoms/TableModalCloseButton";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00B3E2",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
});

interface ItemModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const SinaTableModal: React.FC<ItemModalProps & { registro: Registro }> = ({
  isOpen,
  handleClose,
  registro,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Modal open={isOpen} onClose={handleClose} aria-labelledby="modal-title">
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            width: "80%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            p: 3,
            borderRadius: 2,
            overflow: "scroll",
            height: "90vh",
          }}
        >
          <Grid
            container
            spacing={3}
            sx={{ p: "2vh 3vw", alignItems: "stretch" }}
          >
            <Grid item xs={11}>
              <TableModalTitle registro={registro} />
            </Grid>
            <Grid
              item
              xs={1}
              container
              alignItems="start"
              justifyContent="end"
            >
              <TableModalCloseButton
                isOpen={isOpen}
                handleClose={handleClose}
              />
            </Grid>
            <Grid item xs={6}>
              <TableModalDetails />
            </Grid>
            <Grid item xs={6} container spacing={2}>
              <TableModalBenefi />
              <TableModalBenefiDetails />
              <TableModalControl />
              <TableModalControlDetails />
              <TableModalHistorico />
              <TableModalHistoricoDetails />
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </ThemeProvider>
  );
};

export default SinaTableModal;
