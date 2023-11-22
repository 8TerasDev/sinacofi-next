import { encryptPassword } from "@/lib/backend.utils";
import { PrismaClient } from "@prisma/client";
const SINACOFIUSER = "sinacofiadmin";
const SINACOFIPASS = "1Q2w3e4R";
async function createNewUser() {
  let prisma: PrismaClient | undefined = undefined;
  try {
    prisma = new PrismaClient();
    const hashedPassword = await encryptPassword(SINACOFIPASS);
    const newAdmin = await prisma.accounts_user.create({
      data: {
        password: hashedPassword,
        is_superuser: true,
        username: SINACOFIUSER,
        first_name: SINACOFIUSER,
        last_name: SINACOFIUSER,
        email: "superadmin@admin.com",
        is_staff: true,
        is_active: true,
        date_joined: new Date(),
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

// createNewUser().then((newAdmin) => console.log(newAdmin));
