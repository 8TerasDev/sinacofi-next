import { logger } from "../logger";
import { prisma } from "../newclient.prisma";

export const getBankById = async (number: number) => {
    try {
        const bank = await prisma.bf_data_process_bancos.findFirst({
            where: {
                id: {
                    equals: number
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
