export const dynamic = 'force-dynamic'
import { getBanks } from '@/lib/banks/getBanks.prisma';
import { updateInfoBankById } from '@/lib/banks/updateInfoBankById.prisma';
import { updateStatusBankById } from '@/lib/banks/updateStatusBankById.prisma';
import { processError } from '@/lib/error';
import { getSessionUser, validateAdminPermission } from '@/lib/security';
import { NextRequest } from 'next/server';

type DeleteParam = { params: { id: number } }

export const DELETE = async (req: NextRequest, { params }: DeleteParam) => {
    try {
        const user = getSessionUser(req);
        validateAdminPermission(user)
        const bankId = params.id;
        updateStatusBankById(bankId, 'DISABLED')
        return new Response(undefined, { status: 204 })
    } catch (error) {
        return processError(error, 'No se ha podido eliminar el banco')
    }
}

export const PUT = async (req: NextRequest, { params }: DeleteParam) => {
    try {
        const user = getSessionUser(req);
        validateAdminPermission(user);
        const data = await req.json();
        const bankId = params.id;
        updateInfoBankById(bankId, data)
        const banks = await getBanks();
        return Response.json(banks)
    } catch (error) {
        return processError(error, 'No se ha podido editar el banco')
    }
}
