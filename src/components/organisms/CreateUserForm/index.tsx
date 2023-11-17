import { FormControl, Stack, Grid, TextField, Button } from '@mui/material';
import React from 'react';

export const CreateUserForm = ({
  handleSubmit,
  setOpenModal,
}) => {
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
              required 
              variant='filled'
              label='Nombre'
              placeholder='Nombre'
              sx={{width:'100%'}}
              />  
          </Grid>
          <Grid item sm={4} padding={'10px'}>
            <TextField 
              required 
              variant='filled'
              label='Apellido'
              placeholder='Apellido'
              sx={{width:'100%'}}
              />  
          </Grid>
          <Grid item sm={4} padding={'10px'}>
            <TextField 
              required 
              variant='filled'
              label='Email'
              placeholder='Email'
              sx={{width:'100%'}}
              />  
          </Grid>
          <Grid item sm={4} padding={'10px'}>
            <TextField 
              required 
              variant='filled'
              label='BankId'
              placeholder='BankId'
              sx={{width:'100%'}}
              />  
          </Grid>
          <Grid item sm={4} padding={'10px'}>
            <TextField 
              required 
              variant='filled'
              label='Role'
              placeholder='Role'
              sx={{width:'100%'}}
              />  
          </Grid>
          <Grid item sm={4} padding={'10px'}>
            <TextField 
              variant='filled'
              label='Telefono'
              placeholder='Telefono'
              sx={{width:'100%'}}
              />  
          </Grid>
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