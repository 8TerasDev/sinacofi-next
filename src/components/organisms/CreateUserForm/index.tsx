import { CreateFormsProps } from '@/app/admin/page';
import { FormControl, Stack, Grid, TextField, Button } from '@mui/material';
import React from 'react';

const Fields = ['Username','Nombre', 'Apellido', 'Email', 'Banco', 'Telefono'];

export const CreateUserForm = ({
  handleSubmit,
  setOpenModal,
}: CreateFormsProps) => {
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
          {Fields.map((item, index) => 
            <Grid item sm={4} padding={'10px'} key={index}>
              <TextField
                required={item !== 'Telefono'}
                variant='filled'
                label={item}
                placeholder={item}
                sx={{width:'100%'}}
                />  
            </Grid>) 
          }
          <Grid item sm={4} padding={'10px'}>
            <TextField 
              required 
              variant='filled'
              label='Password'
              placeholder='Password'
              sx={{width:'100%'}}
              id="password"
              name="password"
              autoComplete="password"
              type={true ? "text" : "password"}
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
          CREAR
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