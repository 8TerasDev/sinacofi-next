import React from "react";
import { TableCell, IconButton } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteIcon from "@mui/icons-material/Delete";

const SinaTableCtaIcons = ({ handleDownload, handleDelete }: any) => {
  return (
    <TableCell>
      <IconButton onClick={handleDelete}>
        <ArrowDownwardIcon />
      </IconButton>
      <IconButton onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </TableCell>
  );
};

export default SinaTableCtaIcons;
