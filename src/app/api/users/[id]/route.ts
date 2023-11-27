export const dynamic = 'force-dynamic'

import { processError } from '@/lib/error';
import { getSessionUser, validateAdminPermission } from '@/lib/security';
import { updateStatusUserById } from '@/lib/users/updateStatusUserById.prisma';
import { NextRequest, NextResponse } from 'next/server';

type DeleteParam = { params: { id: number } }

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
