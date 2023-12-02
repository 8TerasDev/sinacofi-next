"use client";
import { BfDataProcessDeclaraciones } from "@/application";
import {
  fetchDeclaracionById,
  fetchDeclaraciones,
} from "@/common/declaraciones";
import React, { createContext, useCallback, useEffect, useState } from "react";

export const NewDeclaracionesContext = createContext<any>({});

type Page = {
  number?: number;
  size?: number;
  total?: number;
};

type PageDeclaracion = {
  page: Page;
  items: BfDataProcessDeclaraciones[];
};

type FieldOrderBy = {
  [key: string]: "asc" | "desc";
};

type FieldFilterBy = {
  [key: string]: string | string[] | undefined;
};

type Args = {
  page?: Page;
  order?: FieldOrderBy;
  filter?: FieldFilterBy;
};

export const NewDeclaracionesProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pageDeclaracion, setPageDeclaracion] =
    useState<PageDeclaracion | null>(null);
  const [args, setArgs] = useState<Args>({});

  const handleChangePage = (event: unknown, newPage: number) => {
    setArgs({
      ...args,
      page: { ...(args?.page ?? {}), number: newPage },
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setArgs({
      ...args,
      page: {
        size: parseInt(event.target.value, 10),
        number: 0,
      },
    });
  };
  const totalDeclaraciones = pageDeclaracion?.page?.total;

  const [activeDeclaracion, activeDeclaracionSetter] =
    useState<BfDataProcessDeclaraciones>();
  const [nextDeclaracion, nextDeclaracionSetter] =
    useState<BfDataProcessDeclaraciones>();
  const [prevDeclaracion, prevDeclaracionSetter] =
    useState<BfDataProcessDeclaraciones>();
  const [firstDeclaracion, firstDeclaracionSetter] = useState<boolean>(false);
  const [lastDeclaracion, lastDeclaracionSetter] = useState<boolean>(false);

  const getDeclaraciones = (declaracion?: BfDataProcessDeclaraciones) => {
    const index =
      pageDeclaracion?.items?.findIndex(
        (item: BfDataProcessDeclaraciones) =>
          item.num_declaracion === declaracion?.num_declaracion
      ) || 0;
    const nextDeclaracion =
      index + 1 >= (pageDeclaracion?.items?.length || 0)
        ? pageDeclaracion?.items?.[index]
        : pageDeclaracion?.items?.[index + 1];
    const prevDeclaracion =
      index - 1 >= 0
        ? pageDeclaracion?.items?.[index - 1]
        : pageDeclaracion?.items?.[index];
    firstDeclaracionSetter(index == 0);
    lastDeclaracionSetter(index == (pageDeclaracion?.items?.length || 0) - 1);
    return { nextDeclaracion, prevDeclaracion };
  };

  const assignDeclaraciones = async (
    declaracion: BfDataProcessDeclaraciones
  ) => {
    setIsLoading(true);
    const { nextDeclaracion, prevDeclaracion } = getDeclaraciones(declaracion);
    activeDeclaracionSetter(declaracion);
    setIsLoading(false);
    if (nextDeclaracion) {
      nextDeclaracionSetter(
        await fetchDeclaracionById(nextDeclaracion.id as any)
      );
    }
    if (prevDeclaracion) {
      prevDeclaracionSetter(
        await fetchDeclaracionById(prevDeclaracion.id as any)
      );
    }
  };

  const handleNextDeclaracion = async (
    declaracion?: BfDataProcessDeclaraciones
  ) => {
    await assignDeclaraciones(declaracion as any);
  };

  const handlePrevDeclaracion = async (
    declaracion: BfDataProcessDeclaraciones
  ) => {
    await assignDeclaraciones(declaracion as any);
  };

  useEffect(() => {
    fetchData().then();
  }, [args]);

  const fetchData = useCallback(
    async (inputArgs = undefined) => {
      const input = inputArgs || args;
      setIsLoading(true);
      try {
        const data = await fetchDeclaraciones(input);
        setPageDeclaracion(data);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    },
    [args]
  );

  const hasData = () => pageDeclaracion?.page?.total ?? (-1 > 0 && !isLoading);

  const setFilters = (
    filters: FieldFilterBy | ((filters: FieldFilterBy) => FieldFilterBy)
  ) => {
    let newFilters = args?.filter ?? {};
    if (typeof filters === "function") {
      newFilters = filters(newFilters);
    } else {
      newFilters = filters;
    }
    setArgs({
      ...args,
      filter: newFilters,
    });
  };

  const setOrders = (
    orders: FieldOrderBy | ((orders: FieldOrderBy) => FieldOrderBy)
  ) => {
    let newOrders = args?.order ?? {};
    if (typeof orders === "function") {
      newOrders = orders(newOrders);
    } else {
      newOrders = orders;
    }
    setArgs({
      ...args,
      order: newOrders,
    });
  };

  const valueContext = {
    isLoading,
    fetchData,
    setFilters,
    setOrders,
    pageData: pageDeclaracion,
    totalDeclaraciones,
    handleChangePage,
    handleChangeRowsPerPage,
    activeDeclaracion,
    nextDeclaracion,
    prevDeclaracion,
    assignDeclaraciones,
    handleNextDeclaracion,
    handlePrevDeclaracion,
    firstDeclaracion,
    lastDeclaracion,
    hasData,
  };
  return (
    <NewDeclaracionesContext.Provider value={valueContext}>
      {children}
    </NewDeclaracionesContext.Provider>
  );
};
