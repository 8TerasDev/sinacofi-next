import axios from '@/common/http-client';

export async function getAllDeclaracionesClientSide(intent = 0) {
    try {
        const { data, status } = await axios.get("api/declaraciones");
        if (status < 400) {
            const declaraciones = data.declaraciones ?? [];
            return declaraciones;
        } else {
            const res: any = await getAllDeclaracionesClientSide(intent + 1)
            return res
        }
    } catch (error) {
        console.error("Error al obtener las declaraciones:", error);
        throw error;
    }
}

const ENDPOINT_DISABLE = "/api/declaraciones";
export async function disable(id: number) {
    try {
        // Realiza una solicitud POST al endpoint de la API con el correlativo de declaración como cuerpo
        const response = await axios.post(ENDPOINT_DISABLE, { id });
        // Retorna la respuesta de la API
        return response.data;
    } catch (error) {
        // Maneja cualquier error que ocurra durante la solicitud
        console.error(
            "Error al llamar al endpoint para deshabilitar declaraciones:",
            error
        );
        throw error;
    }
}
