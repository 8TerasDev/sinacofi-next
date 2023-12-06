import { logger } from "../logger";
import { prisma } from "../newclient.prisma";

export const getBankByCode = async (code: string) => {
    try {
        const bank = await prisma.bf_data_process_bancos.findFirst({
            where: {
                codigo: {
                    equals: code
                }
            }
        });
        return bank
    }
    catch (err) {
        logger.error(err);
        throw err
    }

}
