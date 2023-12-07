import { passwordPattern } from '@/common/form-validation'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material'
import React, { useState } from 'react'

const PasswordTextField = (props: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <TextField
      id='password'
      label='Contraseña'
      placeholder='Contraseña'
      {...props}
      variant='filled'
      sx={{ width: "100%" }}
      type={showPassword ? "text" : "password"}
      inputProps={{ pattern: passwordPattern }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="mostrar contraseña"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}

export default PasswordTextField