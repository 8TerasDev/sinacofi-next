import { CreateFormsProps } from '@/app/admin/page';
import { getValidationErrorText, hasError, validatorOptions } from '@/common/form-validation';
import PhoneInputMask from '@/components/atoms/PhoneInputMask';
import { FormControl, Stack, Grid, TextField, Button } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

export const CreateBankForm = ({
  handleSubmit,
  setOpenModal,
}: CreateFormsProps) => {
  const { register, handleSubmit: validateForm, formState: { errors } } = useForm()
  return (
    <FormControl
      fullWidth
      required
      component={'form'}
      onSubmit={validateForm((_, event) => { handleSubmit(event) })}
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
              error={hasError('nombre', errors)}
              helperText={getValidationErrorText('nombre', errors)}
              {...register('nombre', validatorOptions.required)}
            />
          </Grid>
          <Grid item sm={4} padding={'10px'}>
            <TextField
              required
              variant='filled'
              label='Código'
              placeholder='Código'
              sx={{ width: '100%' }}
              error={hasError('codigo', errors)}
              helperText={getValidationErrorText('codigo', errors)}
              {...register('codigo', validatorOptions.required)}
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
              error={hasError('telefono', errors)}
              helperText={getValidationErrorText('telefono', errors)}
              {...register('telefono', validatorOptions.telefono)}
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