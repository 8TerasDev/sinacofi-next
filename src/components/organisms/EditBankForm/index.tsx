import { CreateFormsProps } from '@/app/admin/page';
import { FormControl, Stack, Grid, TextField, Button } from '@mui/material';
import React from 'react';

export const EditBankForm = ({
  handleSubmit,
  setOpenModal,
  currentRow,
}: CreateFormsProps) => {
  const {nombre, codigo} = currentRow; 
  return(
    <FormControl 
      fullWidth
      required
      component={'form'}
      onSubmit={handleSubmit}
      sx={{ justifyContent:'space-between', flex:1}}
      >
      <Stack overflow={'auto'}>
        <Grid container sx={{ justifyContent:'center', height:'100%', flex:1}} >
          <Grid item sm={4} padding={'10px'}>
            <TextField
              defaultValue={nombre}
              required 
              variant='filled'
              label='Nombre'
              placeholder='Nombre'
              sx={{width:'100%'}}
              />  
          </Grid>
          <Grid item sm={4} padding={'10px'}>
            <TextField
              defaultValue={codigo}
              required 
              variant='filled'
              label='Codigo'
              placeholder='Codigo'
              sx={{width:'100%'}}
              />  
          </Grid>
        </Grid>
    </Stack>
    <Stack padding={'10px'} flexDirection={'row'} justifyContent={'space-around'}>
      <Button
        sx={{width:'40%'}}
        color='success'
        variant='contained' 
        type='submit'>
        EDITAR
      </Button>
      <Button
        sx={{width:'40%'}}
        fullWidth
        color='inherit'
        variant='contained' 
        onClick={()=>setOpenModal(false)}>
        Cerrar
      </Button>
    </Stack>
  </FormControl>
  )
}