import React, { useEffect, useState } from "react";
import { Divider, Grid, Modal, Paper, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TableModalDetails from "../../molecules/TableModalDetails";
import TableModalAccordion from "../../molecules/TableModalAccordion";
import TableModalCloseButton from "../../atoms/TableModalCloseButton";
import TableModalFooter from "@/components/molecules/TableModalFooter";

import { TableModalTitle } from "@/components/molecules/TableModalTitle";
import { BfDataProcessDeclaraciones } from "@/application";

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

type SinaTableModalProps = {
  declaracion: BfDataProcessDeclaraciones | null;
  isOpen: any;
  isLoading: boolean;
  handleClose: any;
  onNextDeclaracion: any;
  onPrevDeclaracion: any;
  handleDelete: any;
};

export const SinaTableModal = ({
  declaracion,
  isOpen,
  handleClose,
  onNextDeclaracion,
  onPrevDeclaracion,
  handleDelete,
  isLoading,
}: SinaTableModalProps) => {
  const [beneficiarios, beneficiariosSetter] = useState<any[]>([]);
  const [controlEfectivo, controlEfectivoSetter] = useState<any[]>([]);

  useEffect(() => {
    const cleanBeneficiarios =
      declaracion?.bf_data_process_beneficiariosfinales?.filter(
        (beneficiarios_finales) =>
          beneficiarios_finales.tipo?.toLowerCase() == "bf"
      ) || [];
    const cleanControl =
      declaracion?.bf_data_process_beneficiariosfinales?.filter(
        (beneficiarios_finales) =>
          beneficiarios_finales.tipo?.toLowerCase() == "ce"
      ) || [];
    beneficiariosSetter(cleanBeneficiarios);
    controlEfectivoSetter(cleanControl);
  }, [declaracion]);

  // @ts-ignore
  const isLastDeclaration = declaracion && declaracion.isLastDeclaration;

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={isOpen} // Usa la prop directamente
        aria-labelledby='modal-title'
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
              <TableModalTitle
                isLoading={isLoading}
                declaracion={declaracion}
              />
            </Grid>
            <Grid
              item
              xs={1}
              container
              alignItems='center'
              justifyContent='flex-end'
            >
              <TableModalCloseButton
                isOpen={isOpen}
                handleClose={handleClose} // Usa la prop directamente
              />
            </Grid>
            <Grid item xs={3}>
              <TableModalDetails
                isLoading={isLoading}
                declaracion={declaracion}
              />
            </Grid>
            <Grid item xs={1}>
              <Divider orientation='vertical' sx={{ height: "100%" }} />
            </Grid>
            <Grid item xs={8}>
              {/* {JSON.stringify(beneficiarios)} */}
              <TableModalAccordion
                type='beneficiarios'
                registros={beneficiarios}
                isLoading={isLoading}
              />
              <TableModalAccordion
                type='control'
                registros={controlEfectivo}
                isLoading={isLoading}
              />
              {/* <TableModalAccordion type="historico" /> */}
            </Grid>
          </Grid>
          <TableModalFooter
            onNextDeclaracion={onNextDeclaracion}
            onPrevDeclaracion={onPrevDeclaracion}
            declaracion={declaracion}
            controlEfectivo={controlEfectivo}
            beneficiarios={beneficiarios}
            handleDelete={
              isLastDeclaration && (() => handleDelete(declaracion))
            }
          />
        </Paper>
      </Modal>
    </ThemeProvider>
  );
};
