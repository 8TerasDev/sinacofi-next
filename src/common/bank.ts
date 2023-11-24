import axios from '@/common/http-client';

export async function deleteBankById(id: number) {
    try {
        const { status, data } = await axios.delete(`api/banks/${id}`);
        if (status >= 400) {
            throw new Error(data.message)
        }
        return status == 204
    } catch (error) {
        console.error("Error al obtener las declaraciones:", error);
        throw error;
    }
}

export async function enableBankById(id: number) {
    try {
        const { status, data } = await axios.post(`api/banks/${id}/enable`);
        if (status >= 400) {
            throw new Error(data.message)
        }
        return status == 204
    } catch (error) {
        console.error("Error al obtener las declaraciones:", error);
        throw error;
    }
}
