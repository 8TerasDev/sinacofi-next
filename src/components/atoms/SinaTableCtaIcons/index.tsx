import React from "react";
import { TableCell, IconButton } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteIcon from "@mui/icons-material/Delete";
//TODO: BORRAR INFO ICON Y QUE FUNCIONE CLICKEANDO LA TABLA EN SI, ESTO ES TEMPORAL UNICAMENTE
import SinaTableModal from "../../organisms/SinaTableModal";
import useModalHandle from "../../../custom-hooks/useModalHandle";
import InfoIcon from "@mui/icons-material/Info";
import { Registro } from '../../organisms/SinaTable';

const SinaTableCtaIcons = ({ registro }: { registro: Registro }) => {
  //Boton De Abrir
  const { isOpen, handleClick } = useModalHandle();
  
  return (
    <TableCell>
      <IconButton>
        <ArrowDownwardIcon />
      </IconButton>
      <IconButton>
        <DeleteIcon />
      </IconButton>
      {/* ELIMINAR LUEGO */}
      <IconButton onClick={handleClick}>
        <InfoIcon />
      </IconButton>
      <SinaTableModal registro={registro} isOpen={isOpen} handleClose={handleClick} />
      {/* ELIMINAR LUEGO */}
    </TableCell>
  );
};

export default SinaTableCtaIcons;
