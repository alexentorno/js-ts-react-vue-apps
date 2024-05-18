import { IUserInfo } from "@/state/AppContext";
import axios from "axios";
import { IResultObject } from "./IResultObject";

export default class AccountService {
    private constructor() {

    }

    private static httpClient = axios.create({
        baseURL: 'https://taltech.akaver.com/api/v1/account/',
    });

    static async login(email: string, pwd: string): Promise<IResultObject<IUserInfo>> {
        const loginData = {
            email: email,
            password: pwd
        }
        try {
            const response = await AccountService.httpClient.post<IUserInfo>("login", loginData);
            if (response.status < 300) {
                localStorage.setItem('token', JSON.stringify(response.data));
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
    }
    static async register(email: string, pwd: string, firstName: string, lastName: string): Promise<IResultObject<IUserInfo>> {
        const registerData = {
            email: email,
            password: pwd,
            firstName: firstName,
            lastName: lastName
        };
        try {
            const response = await AccountService.httpClient.post<IUserInfo>("register", registerData);
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
