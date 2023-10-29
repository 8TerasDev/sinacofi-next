import React from "react";
import { TableCell, IconButton } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteIcon from "@mui/icons-material/Delete";

const SinaTableCtaIcons = () => {
  return (
    <TableCell>
      <IconButton>
        <ArrowDownwardIcon />
      </IconButton>
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </TableCell>
  );
};

export default SinaTableCtaIcons;
