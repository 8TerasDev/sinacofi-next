import { CreateFormsProps } from '@/app/admin/page';
import { FormControl, Stack, Grid, TextField, Button, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';

const Fields = ['Username','Nombre', 'Apellido', 'Email'];

export const CreateUserForm = ({
  handleSubmit,
  setOpenModal,
  banks,
}: CreateFormsProps) => {
  const [bank, setBank] = useState("none");
  return(
    <FormControl
      variant='filled'
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
                required
                variant='filled'
                label={item}
                placeholder={item}
                sx={{width:'100%'}}
                />  
            </Grid>) 
          }
          <Grid item sm={4} padding={'10px'}>
            <InputLabel id="select-label" sx={{visibility:'hidden'}}>Banco</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              label="Banco"
              fullWidth
              placeholder="Banco"
              value={bank}
              onChange={(e)=>setBank(e.target.value)}
            >
              <MenuItem disabled value="none">Banco</MenuItem>
              {banks.map((bank,index) => (
                <MenuItem key={index} value={bank.codigo}>
                  {bank.nombre}
                </MenuItem>
              ))}
            </Select>
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