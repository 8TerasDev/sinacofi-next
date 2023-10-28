import React from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const TableModalCloseButton: React.FC<{
  isOpen: boolean;
  handleClose: () => void;
}> = ({ handleClose }) => {
  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        py: 2,
        px: 3,
        zIndex: 5,
      }}
    >
      <IconButton
        onClick={handleClose}
        sx={{ height: "5vh", width: "5vh" }}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default TableModalCloseButton;
