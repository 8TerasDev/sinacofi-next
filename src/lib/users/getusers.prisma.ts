import { prisma } from "../newclient.prisma";

export const getUsers = async () => {
  try {
    const users = await prisma.accounts_user.findMany({
      orderBy: [
        {
          status: 'asc',
        },
      ],
    });
    const stringUsers = users.map((user: any) => {

      user.id = user.id.toString();
      // @ts-ignore
      delete user.password;

      return { ...user, bank_id: user.bank_id?.toString() }
    });
    return stringUsers;
  }
  catch (err) {
    console.log(err);
    throw err;
  }

}
