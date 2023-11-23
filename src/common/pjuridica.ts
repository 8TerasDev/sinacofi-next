import axios from '@/common/http-client';

const API_URL_PJ = "/api/pjuridica";
const API_URL_PJ_BY = "/api/pjuridicaby";

export async function disablePJuridicasAxios(correlativo_declaracion: string) {
    try {
        // Realiza una solicitud POST al endpoint de la API con el correlativo de declaración como cuerpo
        const response = await axios.post(API_URL_PJ, { correlativo_declaracion });
        // Retorna la respuesta de la API
        return response.data;
    } catch (error) {
        // Maneja cualquier error que ocurra durante la solicitud
        console.error(
            "Error al llamar al endpoint para deshabilitar p_juridicas:",
            error
        );
        throw error;
    }
}



export async function getDelcaracionesByCorrelativos(
    correlativos_declaracion: string[]
) {
    try {
        console.log("correlativos_declaracion", correlativos_declaracion);
        // Realiza una solicitud POST al endpoint de la API con el correlativo de declaración como cuerpo
        const response = await axios.post(API_URL_PJ_BY, {
            correlativos_declaracion,
        });
        console.log("response", response);
        return response.data.declaraciones;
    } catch (error) {
        // Maneja cualquier error que ocurra durante la solicitud
        console.error(
            "Error al llamar al endpoint para deshabilitar getDeclaracionesByRutBeneficiario:",
            error
        );
        throw error;
    }
}
