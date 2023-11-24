import axios from '@/common/http-client';

export async function deleteUserById(id: number) {
    try {
        const { status, data } = await axios.delete(`api/users/${id}`);
        if (status >= 400) {
            throw new Error(data.message)
        }
        return status == 204
    } catch (error) {
        console.error("Error al obtener las declaraciones:", error);
        throw error;
    }
}
export async function enableUserById(id: number) {
    try {
        const { status, data } = await axios.post(`api/users/${id}/enable`);
        if (status >= 400) {
            throw new Error(data.message)
        }
        return status == 204
    } catch (error) {
        console.error("Error al obtener las declaraciones:", error);
        throw error;
    }
}
