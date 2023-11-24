import React from "react";
import { TableCell, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Download from "@mui/icons-material/Download";
import { DeclaracionPDF } from "@/components/molecules/PDFViewer";
import { PDFDownloadLink } from "@react-pdf/renderer";

const SinaTableCtaIcons = ({ handleDownload, handleDelete, declaracion }: any) => {
  const {
    bf_data_process_beneficiariosfinales: beneficiarios,
    bf_data_process_personasjuridicas: pjuridicas
  } = declaracion;
  return (
    <TableCell>
      <PDFDownloadLink
        document={
          <DeclaracionPDF
            declaracion={declaracion}
            controlEfectivo={pjuridicas}
            beneficiarios={beneficiarios} 
            />
        }
        fileName="declaracion.pdf"
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
