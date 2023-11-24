export const dynamic = 'force-dynamic'
import { updateStatusBankById } from '@/lib/banks/updateStatusBankById.prisma';
import { processError } from '@/lib/error';
import { getSessionUser, validateAdminPermission } from '@/lib/security';
import { NextRequest } from 'next/server';

type DeleteParam = { params: { id: number } }

export const POST = async (req: NextRequest, { params }: DeleteParam) => {
    try {
        const user = getSessionUser(req);
        validateAdminPermission(user)
        const bankId = params.id;
        updateStatusBankById(bankId, 'ACTIVE')
        return new Response(undefined, { status: 204 })
    } catch (error) {
        return processError(error)
    }
}
