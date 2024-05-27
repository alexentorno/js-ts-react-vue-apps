import axios from "axios";

const baseURL = 'https://taltech.akaver.com/api/v1/';

const userInfo = JSON.parse(localStorage.getItem('userInfo') ?? "[]");
const token = JSON.parse(localStorage.getItem('token') ?? "");
console.log(userInfo);
console.log(token);
const httpClient = axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Bearer ' + userInfo.token
    }
});

httpClient.interceptors.response.use((response) => {
    
    return response;

}, async (error) => {

    console.log('interceptor is managing response!');
    if (error.response.status === 401) {
        const payload = {
            jwt: userInfo.token,
            refreshToken: userInfo.refreshToken
        };

        const response = await httpClient.post(
            "account/RefreshToken",
            payload
        );

        localStorage.setItem(
            "userInfo",
            JSON.stringify(response.data)
        );

        error.confog.headers[
            "Authorization"
        ] = `Bearer ${response.data.token}`;

        return axios(error.config);
    } else {
        return Promise.reject(error);
    }
});

export default httpClient;

