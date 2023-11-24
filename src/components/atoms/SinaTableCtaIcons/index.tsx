import React from "react";
import { TableCell, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Download from "@mui/icons-material/Download";
import { DeclaracionPDF } from "@/components/molecules/PDFViewer";
import { PDFDownloadLink } from "@react-pdf/renderer";

const SinaTableCtaIcons = ({ handleDelete, declaracion }: any) => {
  const beneficiarios = declaracion?.bf_data_process_beneficiariosfinales?.filter(beneficiarios_finales => beneficiarios_finales.tipo === "bf") || []
  const controlEfectivo = declaracion?.bf_data_process_beneficiariosfinales?.filter(beneficiarios_finales => beneficiarios_finales.tipo === "ce") || []
  const razonSocial = declaracion.bf_data_process_personasjuridicas[0].razon_social;
  return (
    <TableCell>
      <PDFDownloadLink
        document={
          <DeclaracionPDF
            declaracion={declaracion}
            controlEfectivo={controlEfectivo}
            beneficiarios={beneficiarios} 
            />
        }
        fileName={`Declaracion-${razonSocial}.pdf`}
      >
        <IconButton>
          <Download />
        </IconButton>
      </PDFDownloadLink>
      <IconButton onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </TableCell>
  );
};

export default SinaTableCtaIcons;
