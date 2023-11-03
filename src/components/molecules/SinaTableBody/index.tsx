import React, { useState } from "react";
import { TableBody, TableRow, TableCell } from "@mui/material";
import SinaTableCtaIcons from "../../atoms/SinaTableCtaIcons";
import { Declaracion } from "@/application";
import "./sinatablebody.css";
import { SinaTableModal } from "@/components/organisms/SinaTableModal";
import useModalHandle from "@/custom-hooks/useModalHandle";
type SinaTableBodyProps = {
  declaraciones: Declaracion[];
};

const SinaTableBody = ({ declaraciones }: SinaTableBodyProps) => {
  const { isModalOpen, handleClick } = useModalHandle();

  return (
    <TableBody>
      {React.Children.toArray(
        declaraciones.map((declaracion) => (
          <TableRow>
            <SinaTableCtaIcons />
            <TableCell>{declaracion.folio}</TableCell>
            <TableCell>{declaracion.persona_juridica.nombre}</TableCell>
            <TableCell>
              {new Date(declaracion.fecha_declaracion).toISOString()}
            </TableCell>
            <TableCell>
              {new Date(declaracion.fecha_carga_declaracion).toISOString()}
            </TableCell>
          </TableRow>
        ))
      )}

      <SinaTableModal
        //TODO: DECLARACIONES ESTA HARDCODEADO
        declaracion={declaraciones[0]}
        isOpen={isModalOpen}
        handleClose={handleClick}
      />
    </TableBody>
  );
};

export default SinaTableBody;
