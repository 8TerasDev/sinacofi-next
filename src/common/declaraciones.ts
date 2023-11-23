import axios from '@/common/http-client';

export async function getAllDeclaracionesClientSide() {
    try {
        const config = {
            headers: {
                "Cache-Control": "no-cache, no-store, must-revalidate",
                Pragma: "no-cache",
                Expires: "0",
            },
        };
        const { data } = await axios.get("api/declaraciones", config);
        return data.declaraciones;
    } catch (error) {
        console.error("Error al obtener las declaraciones:", error);
        throw error;
    }
}
