// TableModalTitle.tsx
import React from "react";
import { Box, Grid } from "@mui/material";
import SinaText from "../../atoms/SinaText";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { BfDataProcessDeclaraciones, Declaracion, PJuridicas } from "@/application";
export const TableModalTitle = ({
  declaracion,
}: { declaracion?: BfDataProcessDeclaraciones | null }) => {
  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        py: 2,
        px: 3,
        zIndex: 5,
        height: "11vh",
        borderRadius: 2,
        borderBottomRightRadius: 0,
      }}
    >
      <Grid item xs={8} container direction="column">
        <Grid item container alignItems="center">
          <Grid item>
            <Box display="flex" alignItems="center">
              <HomeOutlinedIcon fontSize="small" />
              <SinaText size="xs" color="var(--gray-text)">
                Todas las declaraciones
              </SinaText>
            </Box>
          </Grid>
          <Grid item sx={{ p: "0 1vw" }}>
            <SinaText size="xs" color="var(--gray-text)">
              /
            </SinaText>
          </Grid>
          <Grid item>
            <Box display="flex" alignItems="center">
              <CalendarMonthIcon fontSize="small" />
              <SinaText size="xs" color="var(--gray-text)">
                Declaración de{" "}
                {declaracion &&
                  `${declaracion.fecha_declaracion}`.slice(0, 10).replace(/-/g, "/")}
              </SinaText>
            </Box>
          </Grid>
          <Grid item sx={{ p: "0 1vw" }}>
            <SinaText size="xs" color="var(--gray-text)">
              /
            </SinaText>
          </Grid>
          <Grid item>
            <Box display="flex" alignItems="center">
              <AttachFileIcon fontSize="small" />
              <SinaText size="xs" color="var(--gray-text)">
                Folio : {declaracion && declaracion.correlativo}
              </SinaText>
            </Box>
          </Grid>
        </Grid>
        <Grid item sx={{ marginTop: "1rem" }}>
          <SinaText size="sl" lineHeight="off">
            {declaracion && declaracion.personas_juridicas?.[0]?.razon_social}
          </SinaText>
        </Grid>
      </Grid>
    </Box>
  );
};
