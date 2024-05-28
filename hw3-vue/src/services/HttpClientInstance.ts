import axios from "axios";
//import { state } from '@/state/AppState';
import { useRouter } from "vue-router"; 

const router = useRouter();

const baseURL = 'https://taltech.akaver.com/api/v1/';

const userInfo = JSON.parse(localStorage.getItem('userInfo') ?? "[]");

//const userInfo = state.userInfo;
console.log(userInfo)
const httpClient = axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: `Bearer ${userInfo.token}` 
    }
});

httpClient.interceptors.response.use((response) => {
    //console.log(userInfo)
    return response;

}, async (error) => {

    console.log('interceptor is managing response!');
    if (error.response.status === 401) {
        console.log("Token expired, refreshing...");
        const response = await httpClient.post(
            "account/RefreshToken",
            {
                jwt: userInfo.token,
                refreshToken: userInfo.refreshToken
            }
        );

        localStorage.setItem("userInfo", JSON.stringify(response.data));

        error.confog.headers[
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

