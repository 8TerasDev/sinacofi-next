import React, { useContext, useState } from "react";
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
import { disablePJuridicasAxios } from "@/common/pjuridica";
import { DeleteModal } from "../DeleteModal";
import RenderTable from "./RenderTable";
import { NewDeclaracionesContext } from "@/contexts/new-declaraciones.context";

const SinaTable = () => {
  const {
    declaraciones,
    currentPage,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    totalDeclaraciones,
    handleOrderByFechaDeclaracion,
    handleOrderByFechaCarga,
    orderByFechaDeclaracion,
    orderByFechaCarga,
    activeDeclaracion,
    nextDeclaracion,
    prevDeclaracion,
    getDeclaraciones,
    assignDeclaraciones,
    handleNextDeclaracion,
    handlePrevDeclaracion,
  } = useContext(NewDeclaracionesContext);

  const [openModal, openModalSetter] = useState<boolean>(false);
  const [currentDeclaracion, setCurrentDeclaracion] = useState();
  const [openDeleteModal, openDeleteModalSetter] = useState<boolean>(false);

  const handleDeleteModal = (declaracion: any) => {
    openDeleteModalSetter((openDeleteModal) => !openDeleteModal);
    setCurrentDeclaracion(declaracion);
  };

  const openModalWithDeclaracion = (
    declaracion: BfDataProcessDeclaraciones
  ) => {
    openModalSetter(true);
    assignDeclaraciones(declaracion);
  };

  const disableDeclaracion = (declaracion: any) => {
    disablePJuridicasAxios(declaracion.correlativo_declaracion);
    // reloadDeclaraciones()
  };

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
                    direction={orderByFechaDeclaracion}
                    onClick={handleOrderByFechaDeclaracion}
                  >
                    <SinaTypography>Fecha de declaración</SinaTypography>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={true}
                    direction={orderByFechaCarga}
                    onClick={handleOrderByFechaCarga}
                  >
                    <SinaTypography>Fecha de carga</SinaTypography>
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <RenderTable
                declaraciones={declaraciones}
                handleDeleteModal={handleDeleteModal}
                openModalWithDeclaracion={openModalWithDeclaracion}
              />
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component='div'
            count={totalDeclaraciones} // Debe ser el número total de elementos
            rowsPerPage={rowsPerPage} // Número de filas por página
            page={Math.min(
              currentPage,
              Math.ceil(totalDeclaraciones / rowsPerPage) - 1
            )} // Asegurando que la página no sea mayor que el total de páginas
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
      <SinaTableModal
        declaracion={activeDeclaracion ? activeDeclaracion : null}
        isOpen={openModal}
        onNextDeclaracion={() => {
          handleNextDeclaracion(nextDeclaracion);
        }}
        onPrevDeclaracion={() => {
          handlePrevDeclaracion(prevDeclaracion);
        }}
        handleClose={() => {
          openModalSetter(false);
        }}
        handleDelete={handleDeleteModal}
      />
      <DeleteModal
        open={openDeleteModal}
        handleClose={() => openDeleteModalSetter(false)}
        handleDelete={() => {
          //console.log(currentDeclaracion);
          currentDeclaracion && disableDeclaracion(currentDeclaracion);
        }}
      />
    </>
  );
};

export default SinaTable;
