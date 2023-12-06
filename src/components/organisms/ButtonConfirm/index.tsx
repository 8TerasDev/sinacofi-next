import { IconButton } from "@mui/material";

import { ConfirmModal } from "../ConfirmModal";
import { useState } from "react";

interface ButtonDeleteProps {
  title: string;
  message: string;
  questionText: string;
  icon: React.ReactNode;
  handleDelete: () => Promise<void>;
}

const ButtonConfirm = ({
  handleDelete,
  title,
  message,
  questionText,
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
        questionText={questionText}
        handleDelete={processDelete}
      />
      <IconButton sx={{ padding: 0 }} onClick={handleOpen}>
        {icon}
      </IconButton>
    </>
  );
};

export default ButtonConfirm;
