//import { PrismaClient } from '@prisma/client';
import { prisma } from "./newclient.prisma";

export type CreateUserProps = {
  first_name: string,
  last_name: string,
  username: string,
  email: string,
  phone?: string,
  password: string,
  bank_id?: any,
  is_active: boolean,
  is_superuser: boolean,
  is_staff: boolean,
  date_joined: Date,
}

export const createUser = async (data: CreateUserProps) => {
  try {
    if (data.bank_id) {
      data.bank_id = BigInt(data.bank_id);
    }
    const newUser = await prisma.accounts_user.create({ data })
    return newUser;
  }
  catch (err) {
    console.log(err)
    throw err
  }

}
