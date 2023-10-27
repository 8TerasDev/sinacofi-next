import { PrismaClient } from "@prisma/client";

export async function verifyCredentials(
  correoInput: string,
  passwordInput: string
) {
  console.time("verifyCredentials");
  const prisma = new PrismaClient();
  try {
    const empleado = await prisma.empleado.findFirst({
      where: {
        correo: correoInput,
        password: passwordInput,
      },
    });

    if (empleado) {
      return true; // Las credenciales son correctas.
    } else {
      return false; // Las credenciales son incorrectas.
    }
  } catch (error) {
    return false;
  } finally {
    await prisma.$disconnect();
    console.timeEnd("verifyCredentials");
  }
}