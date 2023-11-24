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
        console.log(err);
        throw err
    }

}
