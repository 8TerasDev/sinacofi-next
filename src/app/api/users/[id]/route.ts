export const dynamic = 'force-dynamic'

import { processError } from '@/lib/error';
import { getSessionUser, validateAdminPermission } from '@/lib/security';
import { getUsers } from '@/lib/users/getusers.prisma';
import { updateInfoUserById } from '@/lib/users/updateInfoUserById.prisma';
import { updateStatusUserById } from '@/lib/users/updateStatusUserById.prisma';
import { NextRequest, NextResponse } from 'next/server';

type DeleteParam = { params: { id: number } }

type UpdateUserProps = {params: {
    first_name?: string,
    last_name?: string,
    username?: string,
    email?: string,
    phone?: string,
    password?: string,
    bank_id?: any,
    is_active?: boolean,
    is_superuser?: boolean,
    is_staff?: boolean,
    date_joined?: Date,
  }
}

export const DELETE = async (req: NextRequest, { params }: DeleteParam) => {
    try {
        const user = getSessionUser(req);
        validateAdminPermission(user)
        const userId = params.id;
        updateStatusUserById(userId, 'DISABLED')
        return new Response(undefined, { status: 204 })
    } catch (error) {
        return processError('No se ha podido eliminar el usuario')
    }
}

export const PUT = async (req: NextRequest, { params }: DeleteParam) => {
    try {
        const editUserId = params.id;
        const user = getSessionUser(req);
        const data = await req.json();
        validateAdminPermission(user)
        await updateInfoUserById(editUserId, data);
        const newUsers = await getUsers();
        return Response.json(newUsers);
        // return new Response(undefined, { status: 204 })
    } catch (error) {
        return processError('No se ha podido eliminar el usuario')
    }
}