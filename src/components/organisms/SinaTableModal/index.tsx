import React from "react";
import { Divider, Grid, Modal, Paper, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TableModalTitle from "../../molecules/TableModalTitle";
import TableModalDetails from "../../molecules/TableModalDetails";
import TableModalAccordion from "../../molecules/TableModalAccordion";
import TableModalCloseButton from "../../atoms/TableModalCloseButton";
import { Registro } from "../../organisms/SinaTable";
import TableModalFooter from "@/components/molecules/TableModalFooter";

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
            borderRadius: 2,
            height: "90vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              p: "2vh 3vw",
              overflowY: "auto",
              flex: "1",
              marginTop: "14vh",
              marginBottom: "10vh",
            }}
          >
            <Grid item xs={11}>
              <TableModalTitle registro={registro} />
            </Grid>
            <Grid
              item
              xs={1}
              container
              alignItems="center"
              justifyContent="flex-end"
            >
              <TableModalCloseButton
                isOpen={isOpen}
                handleClose={handleClose}
              />
            </Grid>
            <Grid item xs={3}>
              <TableModalDetails />
            </Grid>
            <Grid item xs={1}>
              <Divider orientation="vertical" sx={{ height: "100%" }} />
            </Grid>
            <Grid item xs={8}>
              <TableModalAccordion type="beneficiarios" />
              <TableModalAccordion type="control" />
              <TableModalAccordion type="historico" />
            </Grid>
          </Grid>
          <TableModalFooter />
        </Paper>
      </Modal>
    </ThemeProvider>
  );
};

export default SinaTableModal;
