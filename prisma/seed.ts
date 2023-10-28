// seed.ts
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Datos de prueba para la entidad empresa
  const empresas = [];
  for (let i = 1; i <= 10; i++) {
    const empresa = await prisma.empresa.create({
      data: {
        rut: `1${i}2345678-9`,
        nombre: `Empresa ${i}`,
      },
    });
    empresas.push(empresa);
  }

  // Datos de prueba para la entidad empleado
  for (let i = 1; i <= 10; i++) {
    await prisma.empleado.create({
      data: {
        rut: `1${i}2345678-0`,
        nombre: `Empleado ${i}`,
        correo: `empleado${i}@empresa.com`,
        password: `password${i}`, // Nota: En un escenario real, es crucial encriptar las contraseñas.
        telefono: `+56912345${i}0`,
        empresa_id: empresas[i - 1].id,
      },
    });
  }

  // Datos de prueba para la entidad declaracion
  const declaraciones = [];
  for (let i = 1; i <= 10; i++) {
    const declaracion = await prisma.declaracion.create({
      data: {
        folio: `001${i}20231017`,
        fecha_declaracion: new Date(),
        fecha_carga_declaracion: new Date(),
        empresa_id: empresas[i - 1].id,
      },
    });
    declaraciones.push(declaracion);
  }

  // Datos de prueba para la entidad beneficiarios_finales
  for (let i = 1; i <= 10; i++) {
    await prisma.beneficiarios_finales.create({
      data: {
        nombre_completo: `Beneficiario Final ${i}`,
        rut_identificacion: `1${i}2345678-1`,
        participacion: `${i}0%`,
        declaracion_id: declaraciones[i - 1].id,
      },
    });
  }

  // Datos de prueba para la entidad control_efectivo
  for (let i = 1; i <= 10; i++) {
    await prisma.control_efectivo.create({
      data: {
        nombre_completo: `Control Efectivo ${i}`,
        rut_identificacion: `1${i}2345678-2`,
        participacion: `${100 - i}0%`,
        declaracion_id: declaraciones[i - 1].id,
      },
    });
  }

  // Datos de prueba para la entidad persona_juridica
  const personasJuridicas = [];
  for (let i = 1; i <= 10; i++) {
    const personaJuridica = await prisma.persona_juridica.create({
      data: {
        rut: `1${i}2345678-3`,
        nombre: `Persona Jurídica ${i}`,
        domicilio: `Calle Falsa 12${i}`,
        comuna: `Comuna ${i}`,
        ciudad: `Ciudad ${i}`,
        constitucion: `Constitución ${i}`,
        telefono: `+56912345${i}1`,
        tipo_sociedad: `Tipo Sociedad ${i}`,
        declaracion_id: declaraciones[i - 1].id,
      },
    });
    personasJuridicas.push(personaJuridica);
  }

  // Datos de prueba para la entidad representante_legal
  for (let i = 1; i <= 10; i++) {
    await prisma.representante_legal.create({
      data: {
        rut: `1${i}2345678-4`,
        nombre: `Representante Legal ${i}`,
        telefono: `+56912345${i}2`,
        correo: `representante${i}@legal.com`,
        persona_juridica_id: personasJuridicas[i - 1].id,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
