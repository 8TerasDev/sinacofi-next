import SinaText from '@/components/atoms/SinaText';
import { Button, Paper, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';

export const UserTableComponent = ({
  rows, 
  tableColumns,
  banks
}:any) => {
  const columns = tableColumns.map((column:any) => ({ 
    field: column.field, 
    headerName: column.name,
    width: window.screen.width/(tableColumns.length+1),
  }));

  const rows2 = rows.map((row:any, index:any) => {
    if(banks) {
      const bank = row.bank_id && banks.find(
        (bank:any) => parseInt(bank.id) === parseInt(row.bank_id)
      );
      const { nombre } = bank || {};
      return({...row, id:index, bank_id: nombre})
    }
    return({...row, id:index})
  } 
  );
  return(
    <DataGrid
      sx={{paddingX:'20px'}}
      hideFooterPagination
      hideFooter
      columns={columns}
      rows={rows2}
      disableRowSelectionOnClick
    />
  )
}


export const AdminStack = ({
  title,
  handleModal,
  showTable,
  setShowTable,
  dataTable,
  tableColumns,
  banks
}:any) => {
  return(
    <Stack>
      <Paper>
        <Stack flexDirection={'row'} justifyContent={'space-around'} padding={'30px'} >
        <SinaText size='sl'>
          {title}
        </SinaText>
          <Button
            sx={{width:'200px'}}
            variant='contained' 
            onClick={handleModal}>
            Crear
          </Button>
        </Stack>
      </Paper>
      <Stack height={'15px'} />
      {dataTable && true && 
        <UserTableComponent 
          rows={dataTable}
          banks={banks} 
          tableColumns={tableColumns}
          onClose={()=>setShowTable(false)}/> }
    </Stack>
  )
}