import React, { useState } from "react";
import { TableBody, TableRow, TableCell } from "@mui/material";
import SinaTableCtaIcons from "../../atoms/SinaTableCtaIcons";
import { Declaracion, PJuridicas } from "@/application";
import "./sinatablebody.css";
import { SinaTableModal } from "@/components/organisms/SinaTableModal";
import useModalHandle from "@/custom-hooks/useModalHandle";
type SinaTableBodyProps = {
  declaraciones: PJuridicas[];
};

const SinaTableBody = ({ declaraciones }: SinaTableBodyProps) => {

  return (
    <TableBody>
      {React.Children.toArray(
        declaraciones.map((declaracion) => (
          <TableRow>
            <SinaTableCtaIcons />
            <TableCell>{declaracion.correlativo_declaracion}</TableCell>
            <TableCell>{declaracion.nombre_rep_legal}</TableCell>
            <TableCell>
              {`${declaracion.fechahora_creacion}`}
            </TableCell>
            <TableCell>
              {`${declaracion.fecha_envio_archivo}`}
            </TableCell>
          </TableRow>
        ))
      )}

    </TableBody>
  );
};

export default SinaTableBody;
