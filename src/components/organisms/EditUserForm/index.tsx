import { CreateFormsProps } from "@/app/admin/page";
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
  const [bank, setBank] = useState("none");
  const [newBankAdmin, setNewBankAdmin] = useState(false);
  const {username, first_name, last_name, is_staff, bank_id} = currentRow;
  console.log(banks)
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
                label={'Username'}
                defaultValue={username}
                // placeholder={currentRow.username}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item sm={4} padding={"10px"}>
              <TextField
                required
                variant='filled'
                label={'Nombre'}
                defaultValue={first_name}
                // placeholder={currentRow.username}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item sm={4} padding={"10px"}>
              <TextField
                required
                variant='filled'
                label={'Apellido'}
                defaultValue={last_name}
                // placeholder={currentRow.username}
                sx={{ width: "100%" }}
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
          {!isBankAdmin && (
            <>
              <Grid item sm={4} padding={"10px"}>
                <InputLabel id='select-label' sx={{ visibility: "hidden" }}>
                  Banco
                </InputLabel>
                <Select
                  labelId='select-label'
                  defaultValue={bank_id}
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
                <FormControlLabel control={
                  <Checkbox
                    value={newBankAdmin}
                    defaultValue={is_staff}
                    onChange={(e) => setNewBankAdmin(e.target.checked)}/>
                } label="Usuario Administrador de banco" />
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
