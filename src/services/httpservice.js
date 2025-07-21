import axios from 'axios';
import config from "../config.json";
axios.defaults.baseURL = config.apiURL;

function setDefaultCommonHeaders(headerName, value) {
    axios.defaults.headers.common[headerName] = value;
}


const httpService = {
    get: axios.get,
    post: axios.post,
    delete: axios.delete,
    put: axios.put,
    patch: axios.patch,
    setDefaultCommonHeaders,
};

export default httpService