import { prisma } from "../newclient.prisma";

export const getUsers = async () => {
  const users = await prisma.accounts_user.findMany();
  const stringUsers = users.map(user => {
    //@ts-ignore
    delete user.id;
    //@ts-ignore
    delete user.password;
    return { 
      ...user, 
      bank_id: user.bank_id?.toString(),
    }
  });
  return stringUsers;
}