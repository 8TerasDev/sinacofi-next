import axios from 'axios'


export function setBasePath(path: string) {
    if (axios.defaults.baseURL) {
        return;
    }
    if (!path) {
        return;
    }
    const paths = path.split("/").filter((p) => p.length > 0);
    if (paths.length == 0) {
        return;
    }

    axios.defaults.baseURL = `/${paths[0]}`;
}
