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
  Tooltip,
  IconButton,
  FormHelperText,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { errorMessages, getValidationErrorText, hasError, validatorOptions } from "@/common/form-validation";
import PasswordTextField from "@/components/atoms/PasswordTextField";
import SinaText from "@/components/atoms/SinaText";
import { Info } from "@mui/icons-material";

export const EditUserForm = ({
  handleSubmit,
  setOpenModal,
  banks,
  isBankAdmin,
  currentRow,
}: CreateFormsProps) => {
  const { username, first_name, last_name, is_staff, bank_id, bankName, email, telefono } = currentRow;
  const [bank, setBank] = useState(bank_id);
  const [newBankAdmin, setNewBankAdmin] = useState(is_staff);
  const { register, watch, control, handleSubmit: validateForm, formState: { errors } } = useForm({
    defaultValues: {
     ...currentRow,
     password: undefined,
     password_confirmation: undefined
    }
  })

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
                <Controller
                  name="bank_id"
                  control={control}
                  rules={validatorOptions.required}
                  render={({ field: { onChange, onBlur, ref } }) => (
                    <FormControl required fullWidth variant='filled' error={hasError('bank_id', errors)}>
                      <InputLabel id='select-label'>
                        Banco
                      </InputLabel>
                      <Select
                        required
                        ref={ref}
                        labelId='select-label'
                        id='select'
                        label='Banco'
                        fullWidth
                        placeholder='Banco'
                        value={bank}
                        onBlur={onBlur}
                        onChange={(e) => {
                          setBank(e.target.value)
                          onChange(e)
                        }}
                      >
                        {banks.map((bank: any) => (
                          <MenuItem key={bank.id} value={bank.id} disabled={bank.disabled}>
                            {bank.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{getValidationErrorText('bank_id', errors)}</FormHelperText>
                    </FormControl>
                  )}
                />
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

          <Grid item container sm={6} padding={"10px"} alignItems="center">
            <Grid item xs>
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
            <Grid item>
              <Tooltip
                arrow
                title={
                  <SinaText size="xs" color="inherit">
                    {errorMessages.passwordMustMatchRequirement}
                  </SinaText>
                }
              >
                <IconButton>
                  <Info />
                </IconButton>
              </Tooltip>
            </Grid>
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
                  label={translate('confirmPassword')}
                  placeholder={translate('confirmPassword')}
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
