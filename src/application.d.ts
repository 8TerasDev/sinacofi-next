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
  id?: string;
  rut_no?: string;
  razon_social?: string;
  domicilio?: string;
  ciudad?: string;
  lugar_de_constitucion?: string;
  telefono?: string;
  cni_no?: string;
  nombre_rep_legal?: string;
  tipo_sociedad?: string;
  codigo_banco?: string;
  correlativo_declaracion?: string;
  codigo_institucion?: string;
  fecha_envio_archivo?: string;
  correlativo?: string;
  archivo_fuente?: string;
  tipo_archivo?: string;
  fechahora_transformacion?: string;
  fechahora_creacion?: Date;
}
