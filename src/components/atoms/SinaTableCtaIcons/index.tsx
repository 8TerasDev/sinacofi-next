import React from "react";
import { TableCell, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Download from "@mui/icons-material/Download";

const SinaTableCtaIcons = ({ handleDownload, handleDelete, isLastDeclaration }: any) => {
  return (
    <TableCell>
      <IconButton onClick={handleDownload}>
        <Download />
      </IconButton>
      {isLastDeclaration && <IconButton onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>}
    </TableCell>
  );
};

export default SinaTableCtaIcons;
