import SinaText from "@/components/atoms/SinaText";
import { Button, CircularProgress, Paper, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

export const UserTableComponent = ({ rows, tableColumns, banks }: any) => {
  const columns = tableColumns.map((column: any) => ({
    field: column.field,
    headerName: column.name,
    renderCell: column.renderCell,
    sortable: column.sortable,
    width: column.renderCell
      ? undefined
      : window.screen.width / (tableColumns.length + 1),
  }));

  const rows2 = rows.map((row: any, index: any) => {
    if (banks) {
      const bank =
        row.bank_id &&
        banks.find((bank: any) => parseInt(bank.id) === parseInt(row.bank_id));
      const { nombre } = bank || {};
      return { ...row, _id: row._id ?? row.id, id: index, bank_id: nombre };
    }
    return { ...row, _id: row._id ?? row.id, id: index };
  });
  return (
    <DataGrid
      sx={{ paddingX: "20px" }}
      hideFooterPagination
      hideFooter
      columns={columns}
      rows={rows2}
      disableRowSelectionOnClick
    />
  );
};

export const AdminStack = ({
  title,
  handleModal,
  dataTable,
  tableColumns,
  banks,
  isLoading,
}: any) => {

  // if (isLoading) return (
  //   <Stack
  //     flex={1}
  //     height={"100vh"}
  //     justifyContent={"center"}
  //     alignItems={"center"}
  //   >
  //     <CircularProgress />
  //   </Stack>
  // );

  return (
    <Stack>
      <Paper>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-around"}
          padding={"30px"}
        >
          <SinaText size='sl'>{title}</SinaText>
          <Button
            sx={{ width: "200px" }}
            variant='contained'
            onClick={handleModal}
          >
            Crear
          </Button>
        </Stack>
      </Paper>
      <Stack height={"15px"} />
      {dataTable && (
        <UserTableComponent
          rows={dataTable}
          banks={banks}
          tableColumns={tableColumns}
        />
      )}
    </Stack>
  );
};
