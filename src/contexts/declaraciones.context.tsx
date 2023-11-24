"use client";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { declaracionesReducer } from "@/reducers/declaraciones.reducer";
import {
  fetchDeclaraciones,
  fetchDeclaracionesByDates,
  getDeclaracionesByRutBeneficiario,
} from "@/common/pfinales";
import { getDelcaracionesByCorrelativos } from "@/common/pjuridica";

export const DeclaracionesContext = createContext<any>({});

export const DeclaracionesProvider = ({ children }: any) => {
  const [isLoading, isLoadingSetter] = useState<boolean>(false);
  const [state, dispatch] = useReducer(declaracionesReducer, {
    declaraciones: [],
  });

  function reloadDeclaraciones() {
    fetchDeclaraciones()
      .then((declaraciones) =>
        dispatch({ type: "INIT", payload: declaraciones })
      )
      .finally(() => {
        isLoadingSetter(false);
      });
  }

  function loadDeclaracionesByDates(startDate: Date, endDate: Date) {
    fetchDeclaracionesByDates(startDate, endDate)
      .then((declaraciones) =>
        dispatch({ type: "INIT", payload: declaraciones })
      )
      .finally(() => {
        isLoadingSetter(false);
      });
  }

  async function getDeclaracionesByBeneficiario(rut: string) {
    try {
      const correlativos = await getDeclaracionesByRutBeneficiario(rut);
      const declaraciones = await getDelcaracionesByCorrelativos(correlativos);
      dispatch({ type: "INIT", payload: declaraciones });
    } catch (error) {}
  }
  function loadFirstDeclaracion() {
    isLoadingSetter(true);
    if (state.declaraciones.length == 0) {
      fetchDeclaraciones()
        .then((declaraciones) =>
          dispatch({ type: "INIT", payload: declaraciones })
        )
        .finally(() => {
          isLoadingSetter(false);
        });
    }
  }

  useEffect(() => {
    loadFirstDeclaracion();
  }, []);
  return (
    <DeclaracionesContext.Provider
      value={{
        state,
        isLoading,
        dispatch,
        reloadDeclaraciones,
        getDeclaracionesByBeneficiario,
        loadDeclaracionesByDates,
      }}
    >
      {children}
    </DeclaracionesContext.Provider>
  );
};
