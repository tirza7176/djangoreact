import axios from "axios";
import config from "../config.json";
axios.defaults.baseURL = config.apiURL;
function setDefaultCommonHeaders(headerName, value) {
    axios.defaults.headers.common[headerName] = value

}

console.log(axios.defaults.headers.common);

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete,
    setDefaultCommonHeaders,


};
export default httpService; 