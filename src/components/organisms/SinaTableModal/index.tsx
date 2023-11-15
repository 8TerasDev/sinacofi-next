import React, { useEffect, useState } from "react";
import { Divider, Grid, Modal, Paper, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TableModalTitle from "../../molecules/TableModalTitle";
import TableModalDetails from "../../molecules/TableModalDetails";
import TableModalAccordion from "../../molecules/TableModalAccordion";
import TableModalCloseButton from "../../atoms/TableModalCloseButton";
import TableModalFooter from "@/components/molecules/TableModalFooter";
import { Declaracion, PJuridicas } from "@/application";
import axios from "axios";

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

interface SinaTableModalProps {
  declaracion: PJuridicas;
  isOpen: boolean;
  handleClose: () => void;
  onNextDeclaracion: () => void;
  onPrevDeclaracion: () => void;
}
export async function fetchPFinales(correlativo_declaracion: string) {
  try {
    const { data } = await axios.get('/api/pfinales', {
      params: {
        correlativo_declaracion
      }
    });
    console.log({ data })
    const pfinales = data.pfinales;

    return pfinales;
  } catch (error) {
    console.error('Hubo un error al obtener las pfinales:', error);
    throw error;
  }
}

export const SinaTableModal = ({
  declaracion,
  isOpen,
  handleClose,
  onNextDeclaracion,
  onPrevDeclaracion
}: any) => {

  const [beneficiarios, beneficiariosSetter] = useState<any[]>([]);
  const [controlEfectivo, controlEfectivoSetter] = useState<any[]>([]);

  useEffect(() => {
    fetchPFinales(declaracion?.correlativo_declaracion!)
      .then(pfinales => {
        const control = pfinales.filter((item: any) => item.tipo_beneficiario_final === "02")
        const finales = pfinales.filter((item: any) => item.tipo_beneficiario_final === "01")
        controlEfectivoSetter(control)
        beneficiariosSetter(finales)
      })
  }, [isOpen])
  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={isOpen} // Usa la prop directamente
        aria-labelledby="modal-title"
        onClose={handleClose} // Usa la prop directamente
      >
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
              <TableModalTitle declaracion={declaracion} />
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
                handleClose={handleClose} // Usa la prop directamente
              />
            </Grid>
            <Grid item xs={3}>
              <TableModalDetails declaracion={declaracion} />
            </Grid>
            <Grid item xs={1}>
              <Divider orientation="vertical" sx={{ height: "100%" }} />
            </Grid>
            <Grid item xs={8}>
              {/* {JSON.stringify(beneficiarios)} */}
              <TableModalAccordion type="beneficiarios" registros={beneficiarios} />
              <TableModalAccordion type="control" registros={controlEfectivo} />
              {/* <TableModalAccordion type="historico" /> */}
            </Grid>
          </Grid>
          <TableModalFooter
            onNextDeclaracion={onNextDeclaracion}
            onPrevDeclaracion={onPrevDeclaracion}
            declaracion={declaracion}
            controlEfectivo={controlEfectivo}
            beneficiarios={beneficiarios}
          />
        </Paper>
      </Modal>
    </ThemeProvider>
  );
};
