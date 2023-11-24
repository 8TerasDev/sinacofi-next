import { IconButton } from "@mui/material";

import { ConfirmModal } from "../ConfirmModal";
import { useState } from "react";

interface ButtonDeleteProps {
  title: string;
  message: string;
  icon: React.ReactNode;
  handleDelete: () => Promise<void>;
}

const ButtonConfirm = ({
  handleDelete,
  title,
  message,
  icon,
}: ButtonDeleteProps) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const processDelete = async () => {
    await handleDelete();
    handleClose();
  };

  return (
    <>
      <ConfirmModal
        title={title}
        message={message}
        open={open}
        handleClose={handleClose}
        handleDelete={processDelete}
      />
      <IconButton onClick={handleOpen}>{icon}</IconButton>
    </>
  );
};

export default ButtonConfirm;
