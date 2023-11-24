"use-client";
import axios from 'axios';

export function getBasePath() {
    const path = document.location.pathname
    if (!path) {
        return undefined;
    }
    const paths = path.split("/").filter((p) => p.length > 0);
    if (paths.length == 0) {
        return undefined;
    }

    return `/${paths[0]}`;
}

const client = axios.create({
    validateStatus: (status) => status < 400
});


client.interceptors.request.use((config) => {
    config.baseURL = getBasePath()

    return config
})

client.interceptors.response.use((res) => {

    return res
}, (err) => {
    const res = err?.response
    const basePath = getBasePath() as string
    if (res && res.status === 401 && basePath !== document.location.pathname) {
        document.location.href = basePath
    }
    return res
})

export default client;
