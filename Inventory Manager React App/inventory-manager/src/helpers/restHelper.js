import axios from "axios";
import config from '../appConfig.json'

export const getRequest = (service, callback) => {
    if (service && callback) {
    const baseURL = config.baseURL;
        axios.get(baseURL + service).then((response) => {
            callback(response.data);
        });
    }
}

export const postRequest = (service, body, callback) => {
    if (service && callback) {
    const baseURL = config.baseURL;
    axios.post(baseURL + service, body)
        .then((response) => {
            callback(response.data);
        });
    }
}

export const putRequest = (service, body, callback) => {
    if (service && callback) {
    const baseURL = config.baseURL;
    axios.put(baseURL + service, body)
        .then((response) => {
            callback(response.data);
        });
    }
}

export const deleteRequest = (service, callback) => {
    if (service && callback) {
    const baseURL = config.baseURL;
        axios.delete(baseURL + service).then((response) => {
            callback(response.data);
        });
    }
}