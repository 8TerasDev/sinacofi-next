// seed.ts
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Datos de prueba para la entidad empresa
  for (let i = 0; i < 10; i++) {
    await prisma.persona_juridica.create({
      data: {
        rut: `rut-pj-${i}`,
        nombre: `Persona Jurídica ${i}`,
        telefono: `+5600000000${i}`,
        // Añade más campos si son necesarios
      },
    });
  }

  // Crear declaraciones
  for (let i = 0; i < 10; i++) {
    await prisma.declaracion.create({
      data: {
        folio: `folio-${i}`,
        fecha_declaracion: new Date(),
        fecha_carga_declaracion: new Date(),
        is_active: true,
        persona_juridica_id: i + 1, // Asumiendo que los IDs de personas jurídicas empiezan en 1
      },
    });
  }

  // Crear beneficiarios finales y control efectivo para cada declaración
  for (let i = 0; i < 10; i++) {
    await prisma.beneficiarios_finales.create({
      data: {
        nombre_completo: `Beneficiario Final ${i}`,
        rut_identificacion: `rut-bf-${i}`,
        participacion: `Participación ${i}`,
        declaracion_id: i + 1,
      },
    });

    await prisma.control_efectivo.create({
      data: {
        nombre_completo: `Control Efectivo ${i}`,
        rut_identificacion: `rut-ce-${i}`,
        participacion: `Participación ${i}`,
        declaracion_id: i + 1,
      },
    });
  }

  // Crear empleados y representantes legales para cada persona jurídica
  for (let i = 0; i < 10; i++) {
    await prisma.empleado.create({
      data: {
        rut: `rut-empleado-${i}`,
        nombre: `Empleado ${i}`,
        correo: `empleado${i}@empresa.com`,
        password: `password${i}`,
        telefono: `+5600000000${i}`,
        persona_juridica_id: i + 1,
      },
    });

    await prisma.representante_legal.create({
      data: {
        rut: `rut-rl-${i}`,
        nombre: `Representante Legal ${i}`,
        telefono: `+5600000000${i}`,
        correo: `rl${i}@empresa.com`,
        persona_juridica_id: i + 1,
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
