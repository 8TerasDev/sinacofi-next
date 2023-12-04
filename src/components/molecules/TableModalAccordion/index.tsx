import React, { useState } from "react";
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import TableModalAccordionDetails from "../TableModalAccordionDetails";
import SinaText from "@/components/atoms/SinaText";
import { BfDataProcessBeneficiariosFinales, PFinales } from "@/application";

type AcordeonProps = {
  type: "beneficiarios" | "control" | "historico";
  registros: BfDataProcessBeneficiariosFinales[];
  isLoading: boolean;
};

const getTitleFromType = (type: AcordeonProps["type"]) => {
  switch (type) {
    case "beneficiarios":
      return "Beneficiarios Finales";
    case "control":
      return "Control Efectivo";
    case "historico":
      return "Historico";
    default:
      return "";
  }
};

const TableModalAcordeon: React.FC<AcordeonProps> = ({
  type,
  registros,
  isLoading,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  const handleDownload = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    // Implement your download function here.
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={handleToggle}
      disableGutters
      sx={{ "&:before": { display: "none" }, boxShadow: "none", mb: "2vh" }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel-content'
        id='panel-header'
        sx={{ bgcolor: "rgba(0, 179, 226, 0.1)", p: "0 1vw" }}
      >
        <Grid container justifyContent='space-between' alignItems='center'>
          <Grid item>
            <SinaText size='xsWide' spacing='on'>
              {getTitleFromType(type)}
            </SinaText>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <TableModalAccordionDetails
          isLoading={isLoading}
          registros={registros}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default TableModalAcordeon;
