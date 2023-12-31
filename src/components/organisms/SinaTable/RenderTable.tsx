"use client";
import { BfDataProcessDeclaraciones, Declaracion } from "@/application";
import SinaTableCtaIcons from "@/components/atoms/SinaTableCtaIcons";
import { DeclaracionPDF } from "@/components/molecules/PDFViewer";
import { handleDownloadCSV } from "@/lib/utils";
import { Button, TableCell, TableRow } from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useRef, useState } from "react";

type RenderTableProps = {
  declaraciones: BfDataProcessDeclaraciones[] | null;
  handleDeleteModal: (declaracion: BfDataProcessDeclaraciones) => void;
  openModalWithDeclaracion: (declaracion: BfDataProcessDeclaraciones) => any;
};

const getBeneficios = (declaracion: any) => {
  return (
    declaracion?.bf_data_process_beneficiariosfinales?.filter(
      (beneficiarios_finales: any) => beneficiarios_finales.tipo.toLowerCase() == "bf"
    ) || []
  );
};

const getControl = (declaracion: any) => {
  return (
    declaracion?.bf_data_process_beneficiariosfinales?.filter(
      (beneficiarios_finales: any) => beneficiarios_finales.tipo.toLowerCase() == "ce"
    ) || []
  );
};

const RowTable = ({
  declaracion,
  handleDeleteModal,
  openModalWithDeclaracion,
}: any) => {
  const [startDownload, setStartDownload] = useState(false);
  const documentRef = useRef<any>(undefined);
  useEffect(() => {
    if (startDownload) {
      setTimeout(() => {
        download();
      }, 300);
    }
  }, [startDownload]);

  const download = useCallback(() => {
    documentRef?.current?.click();
    setTimeout(() => {
      setStartDownload(false);
    }, 200);
  }, [startDownload]);
  
  return (
    <TableRow key={declaracion.id}>
      <SinaTableCtaIcons
        isLastDeclaration={declaracion.isLastDeclaration} 
        handleDelete={() => handleDeleteModal(declaracion)}
        // handleDownload={() => {
        //   setStartDownload(() => {
        //     return true;
        //   });
        // }}
        handleDownload={()=>handleDownloadCSV(declaracion,'declaracion')}
      />
      <TableCell>
        {/* NOT DELETE THIS LINES, MAY BE WILL BE USED SOON
        <span style={{ display: "none" }}>
          {startDownload && (
            <PDFDownloadLink
              document={
                <DeclaracionPDF
                  declaracion={declaracion}
                  controlEfectivo={getControl(declaracion)}
                  beneficiarios={getBeneficios(declaracion)}
                />
              }
              fileName={`declaracion_${declaracion.id}${Date.now()}.pdf`}
            >
              <button ref={documentRef}>descargar</button>
            </PDFDownloadLink>
          )}
        </span> */}
        {declaracion.codigo_banco} {declaracion.num_declaracion}
      </TableCell>
      <TableCell>
        <Button onClick={() => openModalWithDeclaracion(declaracion)}>
          {declaracion?.bf_data_process_personasjuridicas?.[0]?.razon_social?.toUpperCase() ??
            ""}
        </Button>
      </TableCell>
      <TableCell>{dayjs(declaracion.fecha_declaracion).format("DD/MM/YYYY")}</TableCell>
      <TableCell>{dayjs(declaracion.fecha_subida).format("DD/MM/YYYY")}</TableCell>
    </TableRow>
  );
};

const RenderTable = ({
  declaraciones,
  handleDeleteModal,
  openModalWithDeclaracion,
}: RenderTableProps) => {
  if (!declaraciones)
    return (
      <TableRow>
        <TableCell colSpan={5}>Fetch Data...</TableCell>
      </TableRow>
    );
  if (declaraciones.length === 0)
    return (
      <TableRow>
        <TableCell colSpan={5}>Fetch Data...</TableCell>
      </TableRow>
    );
  return declaraciones.map((declaracion: BfDataProcessDeclaraciones) => (
    <RowTable
      key={declaracion.id}
      declaracion={declaracion}
      handleDeleteModal={handleDeleteModal}
      openModalWithDeclaracion={openModalWithDeclaracion}
    />
  ));
};

export default RenderTable;
