import { prisma } from "../newclient.prisma";

export const getBanks = async () => {
  try {
    const banks = await prisma.bf_data_process_bancos.findMany({
      orderBy: [
        {
          status: 'asc',
        },
      ],
    });
    //return banks;
    return banks.map((bank) => {
      return { ...bank, id: bank.id.toString() as any }
    })
  }
  catch (err) {
    console.log(err);
    throw err
  }

}
