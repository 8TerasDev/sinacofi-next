import { CreateFormsProps } from "@/app/admin/page";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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
} from "@mui/material";
import React, { useState } from "react";

const Fields = ["Username", "Nombre", "Apellido"];

export const CreateUserForm = ({
  handleSubmit,
  setOpenModal,
  banks,
  isBankAdmin,
}: CreateFormsProps) => {
  const [bank, setBank] = useState("none");
  const [newBankAdmin, setNewBankAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
          {Fields.map((item, index) => (
            <Grid item sm={4} padding={"10px"} key={index}>
              <TextField
                required
                variant='filled'
                label={item}
                placeholder={item}
                sx={{ width: "100%" }}
              />
            </Grid>
          ))}
          <Grid item sm={4} padding={"10px"}>
            <TextField
              required
              variant='filled'
              label={'Email'}
              placeholder={'Email'}
              sx={{ width: "100%" }}
              type='email'
            />
          </Grid>
          <Grid item sm={4} padding={"10px"}>
            <TextField
              required
              variant='filled'
              label='Password'
              placeholder='Password'
              sx={{ width: "100%" }}
              id='password'
              name='password'
              autoComplete='password'
              type={showPassword ? "text" : "password"}
              inputProps={{
                pattern: "(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[a-z]).{8,}",
                //(?=.*?[#?!@$ %^&*-])
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={()=>setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          {!isBankAdmin && (
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
                    <MenuItem key={index} value={bank.id}>
                      {bank.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item sm={4} padding={"10px"}>
                <TextField
                  required
                  variant='filled'
                  label={'Telefono'}
                  placeholder={'Telefono'}
                  sx={{ width: "100%" }}
                  type='tel'
                />
              </Grid>
              <Grid item sm={4} padding={"10px"}>
                <Stack flexDirection={'row'} alignItems={'center'}>
                <FormControlLabel control={
                  <Checkbox
                    value={newBankAdmin} 
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
