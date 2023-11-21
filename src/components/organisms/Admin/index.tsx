import SinaText from '@/components/atoms/SinaText';
import { Button, Paper, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';

//const preColumns = ['username', 'first_name', 'last_name', 'email', 'is_staff'];
export const UserTableComponent = ({rows, onClose, 
 tableColumns
}:any) => {
  const columns = tableColumns.map((column:any) => ({ 
    field: column, 
    headerName: column,
    width: window.screen.width/6, 
  }));

  const rows2 = rows.map((row:any, index:any) =>({...row, id:index}));
  return( 
    <Paper sx={{justifyContent:'center', alignItems:'center', width:'100%', height:'100%'}}>
      {/* <Button variant='outlined' onClick={onClose}>X</Button> */}
      <DataGrid
        hideFooterPagination
        columns={columns}
        //rows={[...rows2, ...rows2, ...rows2]}
        rows={rows2}
        disableRowSelectionOnClick
        //pageSizeOptions={[5]}
        // initialState={{
        //   pagination:{
        //     paginationModel: {
        //       pageSize:5
        //     }
        //   }
        // }}
      />
    </Paper>
  )
}


export const AdminStack = ({
  title,
  handleModal,
  showTable,
  setShowTable,
  dataTable,
  tableColumns
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
          <Button 
            sx={{width:'200px'}}
            variant='contained' 
            onClick={()=>setShowTable(true)}>
            Ver
          </Button>
        </Stack>
      </Paper>
      <Stack height={'15px'} />
      {dataTable && true && 
        <UserTableComponent 
          rows={dataTable} 
          tableColumns={tableColumns}
          onClose={()=>setShowTable(false)}/> }
    </Stack>
  )
}