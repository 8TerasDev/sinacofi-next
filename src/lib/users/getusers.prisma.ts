import { prisma } from "../newclient.prisma";

export const getUsers = async () => {
  try{ 
    const users = await prisma.accounts_user.findMany();
    const stringUsers = users.map(user => {
      //@ts-ignore
      // delete user.id;
      //@ts-ignore
      // delete user.password;
      const {last_login, last_name, first_name, is_superuser, username, email, is_staff, is_active, bank_id} = user;
  
      return { 
        last_login,
        last_name,
        first_name,
        is_active,
        is_staff,
        is_superuser, 
        username,
        email, 
        bank_id: bank_id?.toString(),
      }
    });
    return stringUsers;
  }
  catch(err){
    console.log(err);
    throw err;
  }

}