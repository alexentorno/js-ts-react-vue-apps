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
            const response = await httpClient.post<IUserInfo>("account/login", loginData);
            if (response.status < 300) {
                localStorage.setItem('userInfo', JSON.stringify(response.data));
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
            const response = await httpClient.post<IUserInfo>("account/register", registerData);
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