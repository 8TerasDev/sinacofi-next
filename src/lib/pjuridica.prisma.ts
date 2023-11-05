import { PJuridicas } from '@/application';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUniqueCorrelativoDeclaracionWithData(): Promise<PJuridicas[] | any> {
    // Primero, obtenemos los valores únicos de `correlativo_declaracion`
    const correlativos = await prisma.p_juridicas.findMany({
        select: {
            correlativo_declaracion: true,
        },
        distinct: ['correlativo_declaracion']
    });

    // Luego, por cada correlativo único, obtenemos el primer registro completo
    const uniqueRecords = await Promise.all(
        correlativos.map(async (correlativo) => {
            return prisma.p_juridicas.findFirst({
                where: {
                    correlativo_declaracion: correlativo.correlativo_declaracion,
                },
            });
        })
    );

    // Filtramos los resultados nulos que pueden aparecer si 'findFirst' no encuentra resultados
    return uniqueRecords.filter(record => record !== null);
}