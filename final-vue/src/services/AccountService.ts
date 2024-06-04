import type { IUserInfo } from "@/state/AppState.ts";
import type { IResultObject } from "./IResultObject.ts";
import httpClient from "@/services/HttpClientInstance.ts";

export default {

    
    async login(email: string, pwd: string): Promise<IResultObject<IUserInfo>> {
        const loginData = {
            email: email,
            password: pwd
        }
        try {
            const response = await httpClient.post<IUserInfo>("identity/Account/Login", loginData);
            if (response.status < 300) {
                //console.log("Login data ", response.data)
                localStorage.setItem('userInfo', JSON.stringify({jwt: response.data.jwt, refreshToken: response.data.refreshToken, email: loginData.email}));
                return {
                    data: response.data
                }
            }
            return {
                errors: [response.status.toString() + " " + response.statusText]
            }
        } catch (error: any) {
            return {
                errors: [JSON.stringify(error)]
            };
        }
    },
   async register(email: string, pwd: string, firstName: string, lastName: string): Promise<IResultObject<IUserInfo>> {
        const registerData = {
            email: email,
            password: pwd,
            firstName: firstName,
            lastName: lastName
        };
        try {
            const response = await httpClient.post<IUserInfo>("identity/Account/Register", registerData);
            if (response.status < 300) {
                return {
                    data: response.data
                };
            }
            return {
                errors: [response.status.toString() + " " + response.statusText]
            };
        } catch (error: any) {
            return {
                errors: [JSON.stringify(error)]
            };
        }
    }

}