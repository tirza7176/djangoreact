import axios from "axios";
import config from "../config.json";
axios.defaults.baseURL = config.apiURL;
function setDefaultCommonHeaders(headerName, value) {
    axios.defaults.headers.common[headerName] = value

}
/*function clearHeader(headerName) {
    delete axios.defaults.headers.common[headerName];
}
*/
console.log(axios.defaults.headers.common);

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete,
    setDefaultCommonHeaders,
    /* clearHeader,*/

};
export default httpService; 