"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SinaText from "../../atoms/SinaText";
import Imagen from "./4ed03bd6967cee4556fe322c59b7a87d.png";
import Link from "next/link";

const Cargando = () => {
  return (
    <div>
      <h1>...cargando</h1>
    </div>
  )
}

const LoginTemplate = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [valueForm, setValueForm] = useState({
    username: "",
    password: "",
  })

  const [isLoading, isLoadingSetter] = useState(false)

  function handleFormChanges(e: any) {
    setValueForm({
      ...valueForm,
      [e.target.name]: e.target.value
    })
    console.log(valueForm)
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    isLoadingSetter(true)
    setTimeout(() => { isLoadingSetter(false) }, 2000)
    console.log(valueForm)
  }

  if (isLoading) {
    return <Cargando />
  }

  return (
    <Box
      //TODO: mover todo esto a un archivo css
      sx={{
        display: "grid",
        width: "100vw",
        height: "100vh",
        background:
          "linear-gradient(295deg, rgba(226, 51, 106, 0.70) -17.18%, rgba(255, 200, 67, 0.70) 3.8%, rgba(70, 185, 120, 0.70) 73.19%, rgba(0, 179, 226, 0.70) 112.7%)",
        placeItems: "center",
        overflow: "hidden",
      }}
    >
      <Paper
        elevation={1}
        //TODO: mover todo esto a un archivo css
        sx={{
          display: "grid",
          gridTemplateRows: "auto auto auto 1fr",
          padding: "30px 60px",
          width: "35vw",
          gap: 3,
          borderRadius: "10px",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
      >
        <Grid
          container
          justifyContent="center"
          //TODO: mover todo esto a un archivo css
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: '#ffffff',
            padding: '16px',
            borderRadius: '8px'
          }}
        >
          {/* //TODO: usar next image */}
          {/* <img src={Imagen} alt="Logo" /> */}
        </Grid>
        <Box>
          <SinaText size="xl" lineHeight="off" font="Gilbert">
            Login
          </SinaText>
          <SinaText lineHeight="off">
            Completa tus datos e ingresa a tu cuenta
          </SinaText>
        </Box>
        <Box
          component="form"
          noValidate
          //TODO: mover todo esto a un archivo css
          sx={{ width: "100%", mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Usuario"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleFormChanges}
          />
          <TextField
            label="Clave"
            variant="outlined"
            margin="normal"
            fullWidth
            id="password"
            name="password"
            autoComplete="password"
            autoFocus
            type={showPassword ? "text" : "password"}
            onChange={handleFormChanges}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            //TODO: mover todo esto a un archivo css
            sx={{ margin: "24px 0 16px", backgroundColor: "#449BA7" }}
          >
            Login
          </Button>

          <SinaText size="xsWide" color="var(--gray-text)">
            Necesitas ayuda? Contáctate con{" "}
            <a
              //TODO: mover todo esto a un archivo css
              style={{
                color: "#449BA7",
                textDecoration: "none",
                fontWeight: 600,
              }}
              href="mailto:helpme@sinacofi.com"
            >
              helpme@sinacofi.com
            </a>
          </SinaText>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginTemplate;
