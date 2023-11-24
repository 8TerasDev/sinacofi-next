import { prisma } from "../newclient.prisma";

export const updateStatusBankById = async (id: number, status: 'DISABLED' | 'ACTIVE') => {
    try {
        const bank = await prisma.bf_data_process_bancos.update({
            where: {
                id: BigInt(id)
            },
            data: {
                status
            }
        });
        return bank
    }
    catch (err) {
        console.log(err);
        throw err
    }

}
