import { useForm, Controller } from "react-hook-form"
import { CreateFormsProps } from "@/app/admin/page";
import SinaText from "@/components/atoms/SinaText";
import PhoneInputMask from "@/components/atoms/PhoneInputMask";
import { Info, Visibility, VisibilityOff } from "@mui/icons-material";
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
  InputAdornment,
  IconButton,
  Tooltip,
  FormHelperText,
} from "@mui/material";
import React, { useState } from "react";
import { translate } from "@/common/translations";
import { errorMessages, getValidationErrorText, hasError, passwordPattern, validatorOptions } from "@/common/form-validation";

export const CreateUserForm = ({
  handleSubmit,
  setOpenModal,
  banks,
  isBankAdmin,
}: CreateFormsProps) => {
  const [bank, setBank] = useState<string>();
  const [newBankAdmin, setNewBankAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { control, register, handleSubmit: validateForm, formState: { errors } } = useForm()
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
          sx={{ justifyContent: "left", height: "100%", flex: 1 }}
        >
          <Grid item sm={4} padding={"10px"}>
            <TextField
              required
              variant='filled'
              label={translate('username')}
              placeholder={translate('username')}
              sx={{ width: "100%" }}
              error={hasError('username', errors)}
              helperText={getValidationErrorText('username', errors)}
              {...register('username', { required: true })}
            />
          </Grid>
          <Grid item sm={4} padding={"10px"}>
            <TextField
              required
              variant='filled'
              label='Nombre'
              placeholder='Nombre'
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
              label='Apellido'
              placeholder='Apellido'
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
              placeholder={'Email'}
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
          <Grid item sm={4} padding={"10px"}>
            <Grid container alignItems="center">
              <Grid item xs>
                <TextField
                  required
                  variant='filled'
                  label={translate('password')}
                  placeholder={translate('password')}
                  sx={{ width: "100%" }}
                  id='password'
                  autoComplete='password'
                  type={showPassword ? "text" : "password"}
                  error={hasError('password', errors)}
                  helperText={getValidationErrorText('password', errors)}
                  {...register('password', validatorOptions.password)}
                  inputProps={{
                    pattern: passwordPattern,
                    //(?=.*?[#?!@$ %^&*-])
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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
          </Grid>

          {!isBankAdmin && (
            <>
              <Grid item sm={4} padding={"10px"}>
                <Controller
                  name="banco"
                  control={control}
                  rules={validatorOptions.required}
                  render={({ field: { onChange, onBlur, ref } }) => (
                    <FormControl required fullWidth variant='filled' error={hasError('banco', errors)}>
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
                          <MenuItem value={bank.id}>
                            {bank.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{getValidationErrorText('banco', errors)}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item sm={4} padding={"10px"}>
                <Stack flexDirection={'row'} alignItems={'center'}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={newBankAdmin}
                        onChange={(e) => setNewBankAdmin(e.target.checked)}
                      />
                    }
                    label="Usuario Administrador de banco" />
                </Stack>
              </Grid>
            </>
          )}
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
          CREAR
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
