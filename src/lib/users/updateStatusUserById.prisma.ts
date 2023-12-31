import { prisma } from "../newclient.prisma";

export const updateStatusUserById = async (id: number, status: 'DISABLED' | 'ACTIVE') => {
    try {
        const user = await prisma.accounts_user.update({
            where: {
                id: BigInt(id)
            },
            data: {
                status
            }
        });
        return user
    }
    catch (err) {
        console.log(err);
        throw err
    }

}
