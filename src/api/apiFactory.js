import axios from "axios"

let instance;

function getInstance() {
    if (instance) {
        return instance;
    }

    instance = axios.create({
        // eslint-disable-next-line
        baseURL: process.env.VUE_APP_BASE_URI,
        timeout: 2500,
        withCredentials: true,
        // headers: { 'Authorization': 'Bearer ' },
    });

    return instance;
}

export default { getInstance };