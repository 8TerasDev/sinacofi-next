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
import BackgroundSinacofi from "@/components/atoms/BackgroundSinacofi";
import ContainerLogin from "@/components/atoms/ContainerLogin";

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
    <BackgroundSinacofi>
      <ContainerLogin>
        <Box sx={{ justifySelf: "center" }}>
          <Image src={Imagen} alt="Logo" />
        </Box>
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
          </Box>
        </FormControl>
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
      </ContainerLogin>
    </BackgroundSinacofi>
  );
};

export default LoginTemplate;
