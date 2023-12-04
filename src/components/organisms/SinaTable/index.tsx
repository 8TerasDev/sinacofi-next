import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import styles from "./sinatable.module.css";
import { BfDataProcessDeclaraciones } from "@/application";
import SinaTypography from "@/components/atoms/SinaTypography";
import { SinaTableModal } from "../SinaTableModal";
import { disable as disableDeclaracionById } from "@/common/declaraciones";
import { DeleteModal } from "../DeleteModal";
import RenderTable from "./RenderTable";
import { NewDeclaracionesContext } from "@/contexts/new-declaraciones.context";
import { fetchDeclaracionById } from "@/common/declaraciones";

const SinaTable = () => {
  const {
    isLoading,
    isLoadingDetail,
    pageData,
    handleChangePage,
    handleChangeRowsPerPage,
    args,
    setOrders,
    activeDeclaracion,
    nextDeclaracion,
    prevDeclaracion,
    assignDeclaraciones,
    handleNextDeclaracion,
    handlePrevDeclaracion,
  } = useContext(NewDeclaracionesContext);

  const [openModal, openModalSetter] = useState<boolean>(false);
  const [currentDeclaracion, setCurrentDeclaracion] = useState<any>();
  const [openDeleteModal, openDeleteModalSetter] = useState<boolean>(false);
  const [data, setData] = useState(pageData);
  useEffect(() => {
    setData(pageData);
  }, [pageData]);

  const handleDeleteModal = (declaracion: any) => {
    openDeleteModalSetter((openDeleteModal) => !openDeleteModal);
    setCurrentDeclaracion(declaracion);
  };

  const openModalWithDeclaracion = async (
    declaracion: BfDataProcessDeclaraciones
  ) => {
    openModalSetter(true);
    await assignDeclaraciones(declaracion.id);
  };

  const disableDeclaracion = useCallback(
    async (_: any) => {
      await disableDeclaracionById(currentDeclaracion.id);
      openModalSetter(false);
      openDeleteModalSetter(false);
      setData(data.filter((item: any) => item.id != currentDeclaracion.id));
    },
    [currentDeclaracion, data]
  );
  const handleOrder = useCallback((field: string) => () => {
    const orders = args?.order || {};
    setOrders({ [field]: orders[field] === "desc" ? "asc" : "desc" });
  }, [args]);
  return (
    <>
      <div className={styles.sinatable_container}>
        <TableContainer
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Table
            aria-label='tabla de personas jurídicas'
            sx={{ overflowX: "scroll" }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <SinaTypography>Acción</SinaTypography>
                </TableCell>
                <TableCell>
                  <SinaTypography>Folio</SinaTypography>
                </TableCell>
                <TableCell>
                  <SinaTypography>Razón Social</SinaTypography>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={true}
                    direction={args?.order?.fecha_declaracion}
                    onClick={handleOrder("fecha_declaracion")}
                  >
                    <SinaTypography>Fecha de declaración</SinaTypography>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={true}
                    direction={args?.order?.fecha_subida}
                    onClick={handleOrder("fecha_subida")}
                  >
                    <SinaTypography>Fecha de carga</SinaTypography>
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <RenderTable
                isLoading={isLoading}
                declaraciones={data?.items ?? []}
                handleDeleteModal={handleDeleteModal}
                openModalWithDeclaracion={openModalWithDeclaracion}
              />
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            labelRowsPerPage='Filas por pagina'
            component='div'
            count={data?.page?.total ?? 0} // Debe ser el número total de elementos
            rowsPerPage={data?.page?.size ?? 10} // Número de filas por página
            page={data?.page?.number ?? 0 + 1} // Asegurando que la página no sea mayor que el total de páginas
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
      <SinaTableModal
        isLoading={isLoadingDetail}
        declaracion={activeDeclaracion ? activeDeclaracion : null}
        isOpen={openModal}
        onNextDeclaracion={async () => {
          await handleNextDeclaracion(nextDeclaracion);
        }}
        onPrevDeclaracion={async () => {
          await handlePrevDeclaracion(prevDeclaracion);
        }}
        handleClose={() => {
          openModalSetter(false);
        }}
        handleDelete={handleDeleteModal}
      />
      <DeleteModal
        open={openDeleteModal}
        handleClose={() => openDeleteModalSetter(false)}
        handleDelete={async () => {
          if (currentDeclaracion) {
            await disableDeclaracion(currentDeclaracion);
          }
        }}
      />
    </>
  );
};

export default SinaTable;
