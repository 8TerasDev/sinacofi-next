import { CreateFormsProps } from "@/app/admin/page";
import PhoneInputMask from "@/components/atoms/PhoneInputMask";
import { translate } from "@/common/translations";
import {
  FormControl,
  Stack,
  Grid,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { getValidationErrorText, hasError, validatorOptions } from "@/common/form-validation";
import PasswordTextField from "@/components/atoms/PasswordTextField";
import SinaText from "@/components/atoms/SinaText";

export const EditUserForm = ({
  handleSubmit,
  setOpenModal,
  banks,
  isBankAdmin,
  currentRow,
}: CreateFormsProps) => {
  const { username, first_name, last_name, is_staff, bank_id, email, telefono } = currentRow;
  const [bank, setBank] = useState(bank_id);
  const [newBankAdmin, setNewBankAdmin] = useState(is_staff);
  const { register, watch, control, handleSubmit: validateForm, formState: { errors } } = useForm()

  return (
    <FormControl
      variant='filled'
      fullWidth
      required
      component={"form"}
      onSubmit={validateForm((_, event) => { handleSubmit(event) })}
      sx={{ justifyContent: "space-between", flex: 1 }}
    >
      <Stack overflow={"auto"}>
        <Grid
          container
          sx={{ justifyContent: "left", height: "100%", flex: 1, marginBottom: "20px" }}
        >
          <Grid item sm={4} padding={"10px"}>
            <TextField
              required
              variant='filled'
              label={translate('username')}
              defaultValue={username}
              sx={{ width: "100%" }}
              error={hasError('username', errors)}
              helperText={getValidationErrorText('username', errors)}
              {...register('username', validatorOptions.required)}
            />
          </Grid>
          <Grid item sm={4} padding={"10px"}>
            <TextField
              required
              variant='filled'
              label={'Nombre'}
              defaultValue={first_name}
              sx={{ width: "100%" }}
              error={hasError('first_name', errors)}
              helperText={getValidationErrorText('first_name', errors)}
              {...register('first_name', { required: true })}
            />
          </Grid>
          <Grid item sm={4} padding={"10px"}>
            <TextField
              required
              variant='filled'
              label={'Apellido'}
              defaultValue={last_name}
              sx={{ width: "100%" }}
              error={hasError('last_name', errors)}
              helperText={getValidationErrorText('last_name', errors)}
              {...register('last_name', { required: true })}
            />
          </Grid>
          <Grid item sm={4} padding={"10px"}>
            <TextField
              required
              variant='filled'
              label={'Email'}
              defaultValue={email}
              sx={{ width: "100%" }}
              type='email'
              error={hasError('email', errors)}
              helperText={getValidationErrorText('email', errors)}
              {...register('email', validatorOptions.email)}
            />
          </Grid>
          <Grid item sm={4} padding={"10px"}>
            <TextField
              required
              defaultValue={telefono}
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
          {/* <Grid item sm={4} padding={"10px"}>
            <TextField
              required
              variant='filled'
              label='Password'
              placeholder='Password'
              sx={{ width: "100%" }}
              id='password'
              name='password'
              autoComplete='password'
              type={"password"}
            />
          </Grid> */}
          {!isBankAdmin && banks && (
            <>
              <Grid item sm={4} padding={"10px"}>
                <FormControl fullWidth variant='filled'>
                  <InputLabel id='select-label'>
                    Banco
                  </InputLabel>
                  <Select
                    labelId='select-label'
                    id='select'
                    label='Banco'
                    fullWidth
                    placeholder='Banco'
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                  >
                    <MenuItem disabled value='none'>
                      Banco
                    </MenuItem>
                    {banks.map((bank: any, index: any) => (
                      <MenuItem value={bank.id}>
                        {bank.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={12} padding={"10px"}>
                <Stack flexDirection={'row'} alignItems={'center'}>
                  <FormControlLabel
                    label="Usuario Administrador de banco"
                    control={
                      <Checkbox
                        defaultChecked={is_staff}
                        value={newBankAdmin}
                        onChange={(e) => setNewBankAdmin(e.target.checked)} />
                    }
                  />
                </Stack>
              </Grid>
            </>
          )}
        </Grid>

        <Grid container>
          <Grid item xs={12} padding={"10px 10px 0"}>
            <SinaText>
              Actualizar contraseña (opcional)
            </SinaText>
          </Grid>

          <Grid item sm={6} padding={"10px"}>
            <Controller
              name="password"
              control={control}
              rules={{
                ...validatorOptions.password,
                required: false,
              }}
              render={({ field: { onChange, onBlur, ref } }) => (
                <PasswordTextField
                  onChange={onChange}
                  onBlur={onBlur}
                  ref={ref}
                  error={hasError('password', errors) || hasError('password_confirmation', errors)}
                  helperText={getValidationErrorText('password', errors)}
                />
              )}
            />
          </Grid>
          <Grid item sm={6} padding={"10px"}>
            <Controller
              name="password_confirmation"
              control={control}
              rules={{
                validate: (val: string) => {
                  const password = watch('password');
                  if (password && password != val) {
                    return "Las contraseñas no coinciden.";
                  }
                },
              }}
              render={({ field: { onChange, onBlur, ref } }) => (
                <PasswordTextField
                  onChange={onChange}
                  onBlur={onBlur}
                  ref={ref}
                  required={!!watch('password')}
                  label='Confirmar constraseña'
                  placeholder='Confirmar constraseña'
                  error={hasError('password_confirmation', errors)}
                  helperText={getValidationErrorText('password_confirmation', errors)}
                />
              )}
            />
          </Grid>
        </Grid>
      </Stack>
      <Stack
        padding={"10px"}
        flexDirection={"row"}
        justifyContent={"space-around"}
      >
        <Button
          sx={{ width: "40%" }}
          color='success'
          variant='contained'
          type='submit'
        >
          EDITAR
        </Button>
        <Button
          sx={{ width: "40%" }}
          fullWidth
          color='inherit'
          variant='contained'
          onClick={() => setOpenModal(false)}
        >
          Cerrar
        </Button>
      </Stack>
    </FormControl>
  );
};
