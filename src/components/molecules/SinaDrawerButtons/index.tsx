"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, Button, Stack } from "@mui/material";
import { TypeOfSearch } from "../../../custom-hooks/typeSearchHook";
import SinaText from "@/components/atoms/SinaText";
import { TypeSearchContext } from "@/contexts/typesearch.context";
import { NewDeclaracionesContext } from "@/contexts/new-declaraciones.context";

const SinaDrawerButtons = ({ isOpen, isOpenSetter }: any) => {
  const [value, setValue] = useState("");
  const [date, setDate] = useState<any>(undefined);
  const { typeOfSearch } = useContext(TypeSearchContext);
  const { setFilters, args } = useContext(NewDeclaracionesContext);

  const handleSearchByParams = useCallback(async() => {
    let filterName = "";
    if (typeOfSearch == TypeOfSearch.FOLIO) {
      filterName = "num_declaracion";
    }
    if (typeOfSearch == TypeOfSearch.BENEFICIARIO) {
      filterName = "person_relationship_rut";
    }
    if (typeOfSearch == TypeOfSearch.RUT) {
      filterName = "person_rut";
    }
    setDate(args?.filter?.fecha_declaracion || -1);
    setFilters((input: any) => {
      const args: any = {};
      if (input.fecha_declaracion) {
        args.fecha_declaracion = input.fecha_declaracion;
      }
      if (value.length > 0) {
        args[filterName] = value;
      }
      return args;
    });
  }, [args, value])

  function placeHolderText() {
    if (typeOfSearch == TypeOfSearch.FOLIO) {
      return "Folio de la declaración";
    }
    if (typeOfSearch == TypeOfSearch.BENEFICIARIO) {
      return "Beneficiario final o Control efectivo";
    }
    if (typeOfSearch == TypeOfSearch.RUT) {
      return "Persona Jurídica";
    }
  }

  function cleanAndSearch({ target }: any) {
    setValue(target.value);
  }

  const resetFilter = () => {
    setValue("");
  };

  useEffect(() => {
    if (value === "") {
      handleSearchByParams().then();
    }
  }, [value]);

  useEffect(() => {
    const filter = args.filter || {};
    if (
      date &&
      filter?.fecha_declaracion &&
      date != filter?.fecha_declaracion &&
      value.length > 0
    ) {
      setValue("");
    }
  }, [args]);

  useEffect(() => {
    resetFilter();
  }, [typeOfSearch]);

  return (
    <>
      {isOpen && (
        <>
          <SinaText> Busca una declaración por:</SinaText>
          <TextField
            label={placeHolderText()}
            placeholder={`busqueda por ${typeOfSearch}`}
            onChange={cleanAndSearch}
            value={value}
            fullWidth
          />
          <Stack
            flexDirection={"row"}
            width={"100%"}
            justifyContent={"space-between"}
          >
            <Button
              variant='contained'
              disabled={value === ""}
              sx={{ width: "45%" }}
              onClick={handleSearchByParams}
            >
              Buscar
            </Button>
            <Button
              variant='contained'
              disabled={value === ""}
              color='inherit'
              sx={{ width: "45%" }}
              onClick={() => resetFilter()}
            >
              Borrar
            </Button>
          </Stack>
        </>
      )}
      {!isOpen && (
        <Button
          variant='contained'
          onClick={() => {
            isOpenSetter(true);
          }}
        >
          <SearchIcon />
        </Button>
      )}
    </>
  );
};

export default SinaDrawerButtons;
