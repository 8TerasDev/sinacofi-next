import { Declaracion } from "@/application";

export const base_pruebas: Declaracion[] = [
  {
    id: 1,
    folio: "000120231017",
    fecha_declaracion: new Date("2023-10-29T14:53:15.347Z"),
    fecha_carga_declaracion: new Date("2023-10-28T14:53:15.347Z"),
    is_active: true,
    persona_juridica_id: 1,
    beneficiarios_finales: [
      {
        id: 1,
        nombre_completo: "Julia Antonia Villar Monje",
        rut_identificacion: "10054559-4",
        participacion: "50",
        declaracion_id: 1,
      },
    ],
    control_efectivo: [
      {
        id: 1,
        nombre_completo: "Maria Alejandra Olivares Vera",
        rut_identificacion: "8412209-2",
        participacion: "40",
        declaracion_id: 1,
      },
    ],
    persona_juridica: {
      id: 1,
      rut: "23605789-5",
      nombre: "WOM Chile",
      domicilio: "Pasaje Lapizlazuli 2169",
      comuna: "Cerro Navia",
      ciudad: "Santiago",
      constitucion: "Chile",
      telefono: "+56000000000",
      tipo_sociedad: "Colectiva",
      empleados: [
        {
          id: 1,
          rut: "13213758-7",
          nombre: "Monica María de las Mercedes Osorio Muñoz",
          correo: "admin",
          password: "admin",
          telefono: "+56000000000",
          persona_juridica_id: 1,
        },
      ],
      representante_legal: [
        {
          id: 1,
          rut: "10054559-4",
          nombre: "Julia Antonia Villar Monje",
          telefono: "+56000000000",
          correo: "rl0@empresa.com",
          persona_juridica_id: 1,
        },
      ],
    },
  },
  {
    id: 2,
    folio: "000120231018",
    fecha_declaracion: new Date("2023-10-29T14:53:15.347Z"),
    fecha_carga_declaracion: new Date("2023-10-28T14:53:15.347Z"),
    is_active: true,
    persona_juridica_id: 1,
    beneficiarios_finales: [
      {
        id: 2,
        nombre_completo: "Andres Ignacio Astudillo Palacios",
        rut_identificacion: "16873654-0",
        participacion: "50",
        declaracion_id: 2,
      },
    ],
    control_efectivo: [
      {
        id: 2,
        nombre_completo: "Maria Alejandra Olivares Vera",
        rut_identificacion: "8412209-2",
        participacion: "40",
        declaracion_id: 2,
      },
    ],
    persona_juridica: {
      id: 1,
      rut: "23605789-5",
      nombre: "Agrícola Los Claveles S.A.",
      domicilio: "Pasaje Lapizlazuli 2169",
      comuna: "Cerro Navia",
      ciudad: "Santiago",
      constitucion: "Chile",
      telefono: "+56000000000",
      tipo_sociedad: "Colectiva",
      empleados: [
        {
          id: 1,
          rut: "13213758-7",
          nombre: "Monica María de las Mercedes Osorio Muñoz",
          correo: "admin",
          password: "admin",
          telefono: "+56000000000",
          persona_juridica_id: 1,
        },
      ],
      representante_legal: [
        {
          id: 1,
          rut: "10054559-4",
          nombre: "Julia Antonia Villar Monje",
          telefono: "+56000000000",
          correo: "rl0@empresa.com",
          persona_juridica_id: 1,
        },
      ],
    },
  },
];
