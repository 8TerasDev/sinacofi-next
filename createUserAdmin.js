//import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");

async function createAdmin() {
  const prisma = new PrismaClient();
  try {
    const newUser = await prisma.accounts_user.create({
      data: {
        password: process.env.ADMIN_PASS || "admin",
        is_superuser: true,
        username: "admin",
        first_name: "admin",
        last_name: "admin",
        email: "admin@admin.com",
        is_staff: true,
        is_active: true,
        date_joined: new Date(),
      },
    });
    return newUser;
  } catch (error) {
    console.error("Error al crear usuario admin", error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

(async function () {
  await createAdmin();
})();
