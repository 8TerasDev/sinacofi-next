import SinaText from "@/components/atoms/SinaText";
import { Box, Button, Modal, Paper, Stack } from "@mui/material";
import React from "react";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  message: string;
  handleClose: () => void;
  handleDelete: () => void;
};

export const ConfirmModal = ({
  open,
  title,
  message,
  handleClose,
  handleDelete,
}: ConfirmModalProps) => (
  <Modal
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
    open={open}
    onClose={handleClose}
  >
    <Paper
      sx={{
        width: "40%",
        minHeight: "200px",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Stack sx={{ paddingBottom: 2 }}>
        <SinaText size='sl' fontWeight={700}>
          {title}
        </SinaText>
        <Box sx={{ height: "13px" }} />
        <SinaText size='xs'>{message}</SinaText>
        <Box sx={{ height: "7px" }} />
        <SinaText size='xs' fontWeight={500}>
          ¿Estás seguro de eliminar este registro?
        </SinaText>
      </Stack>
      <Stack
        flexDirection={"row"}
        justifyContent={"flex-end"}
        alignItems={"flex-end"}
      >
        <Button
          onClick={handleClose}
          variant='outlined'
          sx={{
            marginRight: 2,
            width: "35%",
            height: "30px",
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleDelete}
          variant='contained'
          color='warning'
          sx={{
            width: "35%",
            height: "30px",
          }}
        >
          Confirmar
        </Button>
      </Stack>
    </Paper>
  </Modal>
);
