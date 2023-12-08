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
  view?: string;
};

export const NewDeclaracionesProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDetail, setLoadingDetail] = useState(false);
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
        (item: BfDataProcessDeclaraciones) => item.id === declaracion?.id
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

  const assignDeclaraciones = async (declaracionId: number) => {
    setLoadingDetail(true);
    try {
      const declaracion = await fetchDeclaracionById(declaracionId);
      const { nextDeclaracion, prevDeclaracion } =
        getDeclaraciones(declaracion);
      activeDeclaracionSetter(declaracion);
      if (nextDeclaracion) {
        nextDeclaracionSetter(nextDeclaracion);
      }
      if (prevDeclaracion) {
        prevDeclaracionSetter(prevDeclaracion);
      }
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleNextDeclaracion = async (
    declaracion?: BfDataProcessDeclaraciones
  ) => {
    await assignDeclaraciones(declaracion?.id as any);
  };

  const handlePrevDeclaracion = async (
    declaracion: BfDataProcessDeclaraciones
  ) => {
    await assignDeclaraciones(declaracion?.id as any);
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
      page: {
        ...(args.page || {}),
        number: 0,
      },
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

  const setView = (view: string) => {
    const page = args?.page || {};
    setArgs({
      ...args,
      page: { ...page, number: 0 },
      view,
    });
  };

  const [openNotificacionBar, openNotificacionBarSetter] = useState(false);
  const handleOpenNotificacionBar = () => {
    openNotificacionBarSetter(!openNotificacionBar);
  };

  const valueContext = {
    isLoadingDetail,
    isLoading,
    fetchData,
    setFilters,
    setOrders,
    setView,
    args,
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
    handleOpenNotificacionBar,
    openNotificacionBar,
  };
  return (
    <NewDeclaracionesContext.Provider value={valueContext}>
      {children}
    </NewDeclaracionesContext.Provider>
  );
};
