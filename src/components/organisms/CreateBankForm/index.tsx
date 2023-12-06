import { CreateFormsProps } from '@/app/admin/page';
import PhoneInputMask from '@/components/atoms/PhoneInputMask';
import { FormControl, Stack, Grid, TextField, Button } from '@mui/material';
import React from 'react';

export const CreateBankForm = ({
  handleSubmit,
  setOpenModal,
}: CreateFormsProps) => {
  return (
    <FormControl
      fullWidth
      required
      component={'form'}
      onSubmit={handleSubmit}
      sx={{ justifyContent: 'space-between', flex: 1 }}
    >
      <Stack overflow={'auto'}>
        <Grid container sx={{ justifyContent: 'center', height: '100%', flex: 1 }} >
          <Grid item sm={4} padding={'10px'}>
            <TextField
              required
              variant='filled'
              label='Nombre'
              placeholder='Nombre'
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item sm={4} padding={'10px'}>
            <TextField
              required
              variant='filled'
              label='Codigo'
              placeholder='Codigo'
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item sm={4} padding={"10px"}>
            <TextField
              required
              variant='filled'
              label={'Teléfono'}
              placeholder={'Teléfono'}
              sx={{ width: "100%" }}
              type='tel'
              InputProps={{
                inputComponent: PhoneInputMask as any,
              }}
            />
          </Grid>
        </Grid>
      </Stack>
      <Stack padding={'10px'} flexDirection={'row'} justifyContent={'space-around'}>
        <Button
          sx={{ width: '40%' }}
          color='success'
          variant='contained'
          type='submit'>
          CREAR
        </Button>
        <Button
          sx={{ width: '40%' }}
          fullWidth
          color='inherit'
          variant='contained'
          onClick={() => setOpenModal(false)}>
          Cerrar
        </Button>
      </Stack>
    </FormControl>
  )
}