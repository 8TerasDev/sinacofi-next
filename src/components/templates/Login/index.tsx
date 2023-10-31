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
  FormControl,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import SinaText from "../../atoms/SinaText";
import Imagen from "./4ed03bd6967cee4556fe322c59b7a87d.png";
import Image from "next/image";
import styles from "./login.module.css";
import useLoginHook from "./login.hook";
import SinaAlert from "@/components/molecules/SinaAlert";

const Cargando = () => {
  return (
    <div>
      <h1>...cargando</h1>
    </div>
  );
};

const LoginTemplate = () => {
  const {
    isPending,
    isError,
    isSuccess,
    handleFormChanges,
    valueForm,
    handleSubmit,
    showPassword,
    handleClickShowPassword,
  } = useLoginHook();

  return (
    <Box
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
        sx={{
          display: "grid",
          gridTemplateRows: "auto auto auto 1fr auto",
          padding: "10px 2em",
          width: "38vw",
          gap: 0.5,
          borderRadius: "10px",
          minHeight: "70vh",
          maxHeight: "85vh",
          // maxWidth: "50vh",
          boxSizing: "border-box",
          overflowY: "auto",
        }}
      >
        <Grid
          container
          sx={{
            justifyContent: "center",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
          }}
        >
          <Image src={Imagen} alt="Logo" />
        </Grid>
        <Box sx={{ textAlign: "left", width: "100%" }}>
          <SinaText size="xl" lineHeight="off" font="Gilbert">
            Login
          </SinaText>
          <SinaText lineHeight="off">
            Completa tus datos e ingresa a tu cuenta
          </SinaText>
        </Box>
        <SinaAlert
          isError={isError}
          isSuccess={isSuccess}
          isPending={isPending}
        />
        <FormControl
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ width: "100%" }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Usuario"
            name="username"
            autoComplete="username"
            autoFocus
            value={valueForm.username}
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
            value={valueForm.password}
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
          <Box
            sx={{ mt: "auto" }} // Asegura que el botón y el texto estén al fondo
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ backgroundColor: "#449BA7" }}
            >
              Login
            </Button>
            <SinaText size="xsWide" color="var(--gray-text)">
              Necesitas ayuda? Contáctate con{" "}
              <a
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
        </FormControl>
      </Paper>
    </Box>
  );
};

export default LoginTemplate;
