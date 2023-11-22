import { PrismaClient } from "@prisma/client";

async function createNewUser() {
  let prisma: PrismaClient
  try {
    prisma = new PrismaClient();
    const newAdmin = await prisma.accounts_user.create({
      data: {
        password: "admin", // Aquí debes poner una contraseña encriptada en un escenario real
        is_superuser: true,
        username: "admin",
        first_name: "admin",
        last_name: "admin",
        email: "admin@admin.com",
        is_staff: true,
        is_active: true,
        date_joined: new Date(), // Esto asigna la fecha y hora actual
      },
    });
    return newAdmin;
  } catch (error) {
    console.error("Error al obtener las declaraciones:", error);
    return [];
  } finally {
    if (prisma) {
      await prisma.$disconnect();
    }
  }
}

createNewUser().then((newAdmin) => console.log(newAdmin));
