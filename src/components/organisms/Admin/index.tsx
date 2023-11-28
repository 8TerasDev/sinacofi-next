import SinaText from "@/components/atoms/SinaText";
import { updateInfoUserById } from "@/lib/users/updateInfoUserById.prisma";
import { Button, Paper, Stack } from "@mui/material";
import { DataGrid, GridRowModes } from "@mui/x-data-grid";
import React from "react";

export const UserTableComponent = ({ rows, tableColumns, banks }: any) => {
  const columns = tableColumns.map((column: any) => ({
    ...column,
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
      onCellEditStop={(e)=>console.log(e)}
      // editMode='row'



      // // // rowModesModel={}
      // // onRowDoubleClick={}
      // // onRowEditStart={(e)=>console.log('a',e)}
      // onRowEditStop={(info)=>{
      //   const { field, row } = info;
      //   const
      //   console.log('b',e)
      
      // }}
      // processRowUpdate={(info)=>{
      //   const {bank_id, first_name, } = info
      //   updateInfoUserById(e)
      //   console.log('process',e)
      // }
      // }
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
