"use client";
import axios from "@/common/http-client";
import { BfDataProcessDeclaraciones } from "@/application";
import { getAllDeclaracionesClientSide } from "@/common/declaraciones";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { TypeSearchContext } from "./typesearch.context";

export const NewDeclaracionesContext = createContext<any>({});

enum typeOffilterEnum {
  FILTER_BY_FOLIO = "FILTER_BY_FOLIO",
  FILTER_BY_PERSONA_JURIDICA = "FILTER_BY_PERSONA_JURIDICA",
  FILTER_BY_BENEFICIARIO_FINAL = "FILTER_BY_BENEFICIARIO_FINAL",
  FILTER_BY_ULTIMA_ACTUALIZADA = "FILTER_BY_ULTIMA_ACTUALIZADA",
  FILTER_BY_ULTIMA_SUBIDA = "FILTER_BY_ULTIMA_SUBIDA",
  FILTER_BY_DATE_RANGE = "FILTER_BY_DATE_RANGE",
}

export const NewDeclaracionesProvider = ({ children }: any) => {
  const { resetFiltertypeOfSearch } = useContext(TypeSearchContext);
  const [declaraciones, declaracionesSetter] = useState<
    BfDataProcessDeclaraciones[] | null
  >(null);

  const [typeOffilter, typeOffilterSetter] = useState<typeOffilterEnum | null>(
    null
  );
  const [filter, filterSetter] = useState<any>(null);
  const [rangeFilter, rangeFilterSetter] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, rowsPerPageSetter] = useState(10);

  const [orderByFechaDeclaracion, orderByFechaDeclaracionSetter] = useState<
    "asc" | "desc"
  >("asc");
  const [orderByFechaCarga, orderByFechaCargaSetter] = useState<"asc" | "desc">(
    "asc"
  );

  const handleOrderByFechaDeclaracion = () => {
    orderByFechaDeclaracionSetter((prev) => (prev === "asc" ? "desc" : "asc"));
    DeclaracionesOrderByFechaDeclaracion();
  };

  const handleOrderByFechaCarga = () => {
    orderByFechaCargaSetter((prev) => (prev === "asc" ? "desc" : "asc"));
    DeclaracionesOrderByFechaCarga();
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    rowsPerPageSetter(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };
  const totalDeclaraciones = declaraciones?.length;

  function paginatedDeclaraciones() {
    const startIndex = currentPage * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return declaraciones?.slice(startIndex, endIndex);
  }

  function declaracionesWithFilter() {
    if (!typeOffilter) return paginatedDeclaraciones();
    if (typeOffilter === typeOffilterEnum.FILTER_BY_FOLIO)
      return DeclaracionesFilterByFolio();
    if (typeOffilter === typeOffilterEnum.FILTER_BY_PERSONA_JURIDICA)
      return DeclaracionesFilterByPersonaJuridica();
    if (typeOffilter === typeOffilterEnum.FILTER_BY_BENEFICIARIO_FINAL)
      return DeclaracionesFilterByBeneficiarioFinal();
    if (typeOffilter === typeOffilterEnum.FILTER_BY_ULTIMA_ACTUALIZADA)
      return DeclaracionesFilterByLastUpdated();
    if (typeOffilter === typeOffilterEnum.FILTER_BY_ULTIMA_SUBIDA)
      return DeclaracionesFilterByLastUploaded();
    if (typeOffilter === typeOffilterEnum.FILTER_BY_DATE_RANGE)
      return filtrarDeclaracionesPorRangoDeFechas();
  }

  function resetFilter() {
    typeOffilterSetter(null);
    filterSetter(null);
    resetFiltertypeOfSearch();
  }

  function FilterByFolio(value: string) {
    typeOffilterSetter(typeOffilterEnum.FILTER_BY_FOLIO);
    filterSetter(value);
  }

  function FilterByPersonaJuridica(value: string) {
    typeOffilterSetter(typeOffilterEnum.FILTER_BY_PERSONA_JURIDICA);
    filterSetter(value);
  }

  function FilterByBeneficiarioFinal(value: string) {
    typeOffilterSetter(typeOffilterEnum.FILTER_BY_BENEFICIARIO_FINAL);
    filterSetter(value);
  }

  function FilterByLastUpdated() {
    typeOffilterSetter(typeOffilterEnum.FILTER_BY_ULTIMA_ACTUALIZADA);
  }

  function FilterByLastUploaded() {
    typeOffilterSetter(typeOffilterEnum.FILTER_BY_ULTIMA_SUBIDA);
  }

  function FilterByDateRange(value: any) {
    typeOffilterSetter(typeOffilterEnum.FILTER_BY_DATE_RANGE);
    rangeFilterSetter(value);
  }

  function DeclaracionesFilterByLastUpdated() {
    if (declaraciones) {
      resetFiltertypeOfSearch();
      const declaracionesOrdenadas = declaraciones?.sort((a, b) => {
        const fechaA = new Date(a.fecha_declaracion || Date.now()).getTime();
        const fechaB = new Date(b.fecha_declaracion || Date.now()).getTime();
        return fechaB - fechaA;
      });
      const registrosMasRecientes = Object.values(
        declaracionesOrdenadas.reduce(
          (acc: any, item: BfDataProcessDeclaraciones) => {
            const owner =
              item?.bf_data_process_personasjuridicas?.[0]?.rut || "0";
            if (
              !acc[owner] ||
              new Date(item.fecha_declaracion || Date.now()) >
                new Date(acc[owner].fecha_declaracion)
            ) {
              acc[owner] = item;
            }
            return acc;
          },
          {}
        )
      );

      return registrosMasRecientes;
    }
  }

  function DeclaracionesFilterByLastUploaded() {
    if (declaraciones) {
      resetFiltertypeOfSearch();
      const declaracionesOrdenadas = declaraciones?.sort((a, b) => {
        const fechaA = new Date(a.fecha_subida || Date.now()).getTime();
        const fechaB = new Date(b.fecha_subida || Date.now()).getTime();
        return fechaB - fechaA;
      });
      const registrosMasRecientes = Object.values(
        declaracionesOrdenadas.reduce(
          (acc: any, item: BfDataProcessDeclaraciones) => {
            const owner =
              item?.bf_data_process_personasjuridicas?.[0]?.rut || "0";
            if (
              !acc[owner] ||
              new Date(item.fecha_declaracion || Date.now()) >
                new Date(acc[owner].fecha_declaracion)
            ) {
              acc[owner] = item;
            }
            return acc;
          },
          {}
        )
      );
      return registrosMasRecientes;
    }
  }

  function DeclaracionesFilterByFolio() {
    return declaraciones?.filter(
      (declaraciones) => declaraciones.num_declaracion === filter
    );
  }

  function DeclaracionesOrderByFechaDeclaracion() {
    if (!declaraciones) return;

    const OrderDeclaraciones = declaraciones.sort((a, b) => {
      const fechaA = new Date(a.fecha_declaracion || Date.now()).getTime();
      const fechaB = new Date(b.fecha_declaracion || Date.now()).getTime();

      return orderByFechaDeclaracion === "asc"
        ? fechaA - fechaB
        : fechaB - fechaA;
    });

    declaracionesSetter(OrderDeclaraciones);
  }

  function filtrarDeclaracionesPorRangoDeFechas() {
    // TODO. FIX RANGE. BUG: SELECT FROM 12/09 TO 12/09.
    const { fechaInicio, fechaFin } = rangeFilter;
    if (!declaraciones) return [];

    const inicio = new Date(fechaInicio).getTime();
    const fin = new Date(fechaFin).getTime();

    return declaraciones.filter((declaracion) => {
      const fechaDeclaracion = new Date(
        declaracion.fecha_declaracion || Date.now()
      ).getTime();
      return fechaDeclaracion >= inicio && fechaDeclaracion <= fin;
    });
  }

  function DeclaracionesOrderByFechaCarga() {
    if (!declaraciones) return;

    const OrderDeclaraciones = declaraciones.sort((a, b) => {
      const fechaA = new Date(a.fecha_subida || Date.now()).getTime();
      const fechaB = new Date(b.fecha_subida || Date.now()).getTime();

      return orderByFechaCarga === "asc" ? fechaA - fechaB : fechaB - fechaA;
    });

    declaracionesSetter(OrderDeclaraciones);
  }

  function DeclaracionesFilterByPersonaJuridica() {
    return declaraciones?.filter((declaracion) =>
      declaracion.bf_data_process_personasjuridicas?.some(
        (persona_juridica) => persona_juridica.rut === filter
      )
    );
  }

  function DeclaracionesFilterByBeneficiarioFinal() {
    return declaraciones?.filter((declaracion) =>
      declaracion.bf_data_process_beneficiariosfinales?.some(
        (beneficiario_final) => beneficiario_final.identificacion === filter
      )
    );
  }

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
      declaraciones?.findIndex(
        (item: BfDataProcessDeclaraciones) =>
          item.num_declaracion === declaracion?.num_declaracion
      ) || 0;
    const nextDeclaracion =
      index + 1 >= (declaraciones?.length || 0)
        ? declaraciones?.[index]
        : declaraciones?.[index + 1];
    const prevDeclaracion =
      index - 1 >= 0 ? declaraciones?.[index - 1] : declaraciones?.[index];
    firstDeclaracionSetter(index == 0);
    lastDeclaracionSetter(index == (declaraciones?.length || 0) - 1);
    return { nextDeclaracion, prevDeclaracion };
  };

  const assignDeclaraciones = (declaracion: BfDataProcessDeclaraciones) => {
    const { nextDeclaracion, prevDeclaracion } = getDeclaraciones(declaracion);
    nextDeclaracionSetter(nextDeclaracion);
    prevDeclaracionSetter(prevDeclaracion);
    activeDeclaracionSetter(declaracion);
  };

  const handleNextDeclaracion = (declaracion?: BfDataProcessDeclaraciones) => {
    const { nextDeclaracion, prevDeclaracion } = getDeclaraciones(declaracion);
    nextDeclaracionSetter(nextDeclaracion);
    prevDeclaracionSetter(prevDeclaracion);
    activeDeclaracionSetter(declaracion);
  };

  const handlePrevDeclaracion = (declaracion: BfDataProcessDeclaraciones) => {
    const { nextDeclaracion, prevDeclaracion } = getDeclaraciones(declaracion);
    nextDeclaracionSetter(nextDeclaracion);
    prevDeclaracionSetter(prevDeclaracion);
    activeDeclaracionSetter(declaracion);
  };

  useEffect(() => {
    getAllDeclaracionesClientSide().then((declaraciones) => {
      declaracionesSetter(declaraciones);
    });
  }, []);

  const valueContext = {
    declaraciones: declaracionesWithFilter(),
    totalDeclaraciones,
    orderByFechaDeclaracion,
    orderByFechaCarga,
    handleChangePage,
    handleChangeRowsPerPage,
    currentPage,
    rowsPerPage,
    FilterByFolio,
    FilterByPersonaJuridica,
    FilterByBeneficiarioFinal,
    FilterByLastUpdated,
    FilterByLastUploaded,
    handleOrderByFechaDeclaracion,
    handleOrderByFechaCarga,
    FilterByDateRange,
    activeDeclaracion,
    nextDeclaracion,
    prevDeclaracion,
    assignDeclaraciones,
    handleNextDeclaracion,
    handlePrevDeclaracion,
    firstDeclaracion,
    lastDeclaracion,
    allDeclaraciones: declaraciones,
    resetFilter,
  };
  return (
    <NewDeclaracionesContext.Provider value={valueContext}>
      {children}
    </NewDeclaracionesContext.Provider>
  );
};
