export interface Empleado {
  id: Number; //": 1,
  rut: String; //": "rut-empleado-0",
  nombre: String; //": "Empleado 0",
  correo: String; //": "empleado0@empresa.com",
  password: String; //": "password0",
  telefono: String; //": "+56000000000",
  persona_juridica_id: Number; //": 1
}

export interface RepresentanteLegal {
  id: Number; // 1,
  rut: String; // "rut-rl-0",
  nombre: String; // "Representante Legal 0",
  telefono: String; // "+56000000000",
  correo: String; // "rl0@empresa.com",
  persona_juridica_id: Number; // 1
}

export interface PersonaJuridica {
  id: Number;
  rut: String | null;
  nombre: String | null;
  domicilio: String | null;
  comuna: String | null;
  ciudad: String | null;
  constitucion: String;
  telefono: String;
  tipo_sociedad: String;
  empleados: Empleado[];
  representante_legal: RepresentanteLegal[];
}

export interface ControlEfectivo {
  id: Number;
  nombre_completo: String;
  rut_identificacion: String;
  participacion: String;
  declaracion_id: Number;
}

export interface BeneficiarioFinal {
  id: Number;
  nombre_completo: String;
  rut_identificacion: String;
  participacion: String;
  declaracion_id: Number;
}

export interface Declaracion {
  id: Number;
  folio: String;
  fecha_declaracion: Date;
  fecha_carga_declaracion: Date;
  is_active: Boolean;
  persona_juridica_id: Number;
  beneficiarios_finales: BeneficiarioFinal[] | null;
  control_efectivo: ControlEfectivo[] | null;
  persona_juridica: PersonaJuridica;
}

export interface PJuridicas {
  registro_id: number;
  id?: string | undefined;
  rut_no?: string | undefined;
  razon_social?: string | undefined;
  domicilio?: string | undefined;
  ciudad?: string | undefined;
  lugar_de_constitucion?: string | undefined;
  telefono?: string | undefined;
  cni_no?: string | undefined;
  nombre_rep_legal?: string | undefined;
  tipo_sociedad?: string | undefined;
  codigo_banco?: string | undefined;
  correlativo_declaracion?: string | undefined;
  codigo_institucion?: string | undefined;
  fecha_envio_archivo?: string | undefined;
  correlativo?: string | undefined;
  archivo_fuente?: string | undefined;
  tipo_archivo?: string | undefined;
  fechahora_transformacion?: string | undefined;
  fechahora_creacion?: Date | undefined;
}