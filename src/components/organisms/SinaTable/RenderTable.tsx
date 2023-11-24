"use client";
import { BfDataProcessDeclaraciones, Declaracion } from "@/application";
import SinaTableCtaIcons from "@/components/atoms/SinaTableCtaIcons";
import { DeclaracionPDF } from "@/components/molecules/PDFViewer";
import { useGetProfile } from "@/custom-hooks/useGetProfile";
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
      (beneficiarios_finales: any) => beneficiarios_finales.tipo === "bf"
    ) || []
  );
};

const getControl = (declaracion: any) => {
  return (
    declaracion?.bf_data_process_beneficiariosfinales?.filter(
      (beneficiarios_finales: any) => beneficiarios_finales.tipo === "ce"
    ) || []
  );
};

const RowTable = ({
  declaracion,
  handleDeleteModal,
  openModalWithDeclaracion,
  userBank
}: any) => {

  const bankCode = userBank === declaracion.codigo_banco ? 
  declaracion.codigo_banco : 'XXXX'; 
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
        handleDelete={() => handleDeleteModal(declaracion)}
        handleDownload={() => {
          setStartDownload(() => {
            return true;
          });
        }}
      />
      <TableCell>
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
        </span>
        {bankCode} {declaracion.num_declaracion}
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
  const { data: userData} = useGetProfile();
  if (!declaraciones || !userData)
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
      userBank={userData?.bank_code}
      key={declaracion.id}
      declaracion={declaracion}
      handleDeleteModal={handleDeleteModal}
      openModalWithDeclaracion={openModalWithDeclaracion}
    />
  ));
};

export default RenderTable;
