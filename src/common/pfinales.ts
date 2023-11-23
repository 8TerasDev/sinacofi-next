import axios from '@/common/http-client';


function transformArray(arrayOfObjects: any) {
    return arrayOfObjects.map((item: any) => item.correlativo_declaracion);
}


const API_URL_PJ = "/api/pjuridica";
const API_URL_PF = "/api/pfinales";

export async function fetchDeclaraciones() {
    try {
        const config = {
            headers: {
                "Cache-Control": "no-cache, no-store, must-revalidate",
                Pragma: "no-cache",
                Expires: "0",
            },
        };
        const { data } = await axios.get(API_URL_PJ, config);
        const declaraciones = data.declaraciones;
        return declaraciones;
    } catch (error) {
        console.error("Hubo un error al obtener las declaraciones:", error);
        return [];
    }
}

export async function fetchDeclaracionesByDates(
    startDate: Date,
    endDate: Date
) {
    try {
        const url = `${API_URL_PJ}?startdate=${encodeURIComponent(
            `${startDate}`
        )}&enddate=${encodeURIComponent(`${endDate}`)}`;
        const config = {
            headers: {
                "Cache-Control": "no-cache, no-store, must-revalidate",
                Pragma: "no-cache",
                Expires: "0",
            },
        };
        const { data } = await axios.get(url, config);
        const declaraciones = data.declaraciones;
        return declaraciones;
    } catch (error) {
        console.error("Hubo un error al obtener las declaraciones:", error);
        return [];
    }
}


export async function getDeclaracionesByRutBeneficiario(
    rut_beneficiario: string
) {
    try {
        const config = {
            headers: {
                "Cache-Control": "no-cache, no-store, must-revalidate",
                Pragma: "no-cache",
                Expires: "0",
            },
            data: { rut_beneficiario },
        };
        // Realiza una solicitud POST al endpoint de la API con el correlativo de declaración como cuerpo
        const response = await axios.post(API_URL_PF, config);
        // Retorna la respuesta de la API
        return transformArray(response.data.declaraciones);
    } catch (error) {
        // Maneja cualquier error que ocurra durante la solicitud
        console.error(
            "Error al llamar al endpoint para deshabilitar p_juridicas:",
            error
        );
        throw error;
    }
}
