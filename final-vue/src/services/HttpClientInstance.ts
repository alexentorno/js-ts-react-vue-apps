import axios from "axios";

const baseURL = 'https://smarty.akaver.com/api/v1/';

let userInfo = JSON.parse(localStorage.getItem('userInfo') ?? "[]");

const httpClient = axios.create({
    baseURL: baseURL
});

httpClient.interceptors.request.use((config) => {
    console.log("interceptor is managing request!");
    userInfo = JSON.parse(localStorage.getItem('userInfo') ?? "[]");
    if(userInfo){
        config.headers[
            "Authorization"
        ] = `Bearer ${userInfo.jwt}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

httpClient.interceptors.response.use((response) => {
    //console.log(userInfo)
    return response;

}, async (error) => {

    console.log('interceptor is managing response!');
    if (error.response.status === 401) {
        console.log("Token expired, refreshing...");
        const response = await httpClient.post(
            "identity/Account/RefreshTokenData",
            {
                jwt: userInfo.jwt,
                refreshToken: userInfo.refreshToken
            }
        );

        localStorage.setItem("userInfo", JSON.stringify(response.data));

        error.config.headers[ // ------------------- CONFOG to CONFIG
            "Authorization"
        ] = `Bearer ${response.data.token}`;

        // refresh the page
        window.location.reload();

        return axios(error.config);
    } else {
        return Promise.reject(error);
    }
});

export default httpClient;

