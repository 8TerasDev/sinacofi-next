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

const Fields = ["Username", "Nombre", "Apellido", "Email"];

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

  return (
    <FormControl
      variant='filled'
      fullWidth
      required
      component={"form"}
      onSubmit={handleSubmit}
      sx={{ justifyContent: "space-between", flex: 1 }}
    >
      <Stack overflow={"auto"}>
        <Grid
          container
          sx={{ justifyContent: "center", height: "100%", flex: 1 }}
        >
          <Grid item sm={4} padding={"10px"}>
            <TextField
              required
              variant='filled'
              label={translate('username')}
              defaultValue={username}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item sm={4} padding={"10px"}>
            <TextField
              required
              variant='filled'
              label={'Nombre'}
              defaultValue={first_name}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item sm={4} padding={"10px"}>
            <TextField
              required
              variant='filled'
              label={'Apellido'}
              defaultValue={last_name}
              sx={{ width: "100%" }}
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
                <InputLabel id='select-label' sx={{ visibility: "hidden" }}>
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
              </Grid>
              <Grid item sm={4} padding={"10px"}>
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
