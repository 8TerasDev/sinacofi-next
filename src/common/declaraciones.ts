import axios from '@/common/http-client';

const parseArgs = (prefix: string, input: any) => {
    const keys = Object.keys(input || {})
    return keys.filter(k => input[k] != null).map(k => {
        if (Array.isArray(input[k])) {
            return input[k].map((v: string) => `${prefix}[${k}][]=${v}`).join("&")
        } else {
            return `${prefix}[${k}]=${input[k]}`
        }
    })
}

export async function fetchDeclaraciones(args: any, intent = 0) {
    const { filter, page, order, view } = args;
    const params = parseArgs('filter', filter).concat(parseArgs('page', page)).concat(parseArgs('order', order))
    if (view) {
        params.push(`view=${view}`)
    }
    const query = params.join("&")

    try {
        const { data, status } = await axios.get(`api/declaraciones?${query}`);
        if (status < 400) {
            return data
        }
        if (intent > 3) {
            throw new Error(data.message ?? "Error al obtener las declaraciones")
        }
        const res: any = await fetchDeclaraciones(args, intent + 1)
        return res

    } catch (error) {
        console.error("Error al obtener las declaraciones:", error);
        throw error;
    }
}

export async function fetchDeclaracionById(id: number, intent = 0) {


    try {
        const { data, status } = await axios.get(`api/declaraciones/${id}`);
        if (status < 400) {
            return data
        }
        if (intent > 3) {
            throw new Error(data.message ?? "Error al obtener las declaraciones")
        }
        const res: any = await fetchDeclaracionById(id, intent + 1)
        return res

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
