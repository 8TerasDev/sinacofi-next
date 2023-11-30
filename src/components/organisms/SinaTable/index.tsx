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
  const [currentDeclaracion, setCurrentDeclaracion] = useState<any>();
  const [openDeleteModal, openDeleteModalSetter] = useState<boolean>(false);
  const [data, setData] = useState(declaraciones);
  useEffect(() => {
    setData(declaraciones);
  }, [declaraciones]);

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

  const disableDeclaracion = useCallback(
    async (_: any) => {
      await disableDeclaracionById(currentDeclaracion.id);
      openModalSetter(false);
      openDeleteModalSetter(false);
      setData(data.filter((item: any) => item.id != currentDeclaracion.id));
    },
    [currentDeclaracion, data]
  );

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
                declaraciones={data}
                handleDeleteModal={handleDeleteModal}
                openModalWithDeclaracion={openModalWithDeclaracion}
              />
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            labelRowsPerPage='Filas por pagina'
            component='div'
            count={data?.length ?? 0} // Debe ser el número total de elementos
            rowsPerPage={rowsPerPage} // Número de filas por página
            page={Math.min(
              currentPage,
              Math.ceil(data?.length ?? 0 / rowsPerPage) - 1
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
