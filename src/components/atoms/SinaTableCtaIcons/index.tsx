import React from "react";
import { TableCell, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Download from "@mui/icons-material/Download";

const SinaTableCtaIcons = ({ handleDownload, handleDelete }: any) => {
  return (
    <TableCell>
      <IconButton onClick={handleDelete}>
        <Download />
      </IconButton>
      <IconButton onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </TableCell>
  );
};

export default SinaTableCtaIcons;
