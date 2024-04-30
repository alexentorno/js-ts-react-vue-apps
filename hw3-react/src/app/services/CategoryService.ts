import { IUserInfo } from "@/state/AppContext";
import axios from "axios";
import { IResultObject } from "./IResultObject";
import { ICategory } from "@/domain/ICategory";

export default class CategoryService {
    private constructor() {

    }

    private static httpClient = axios.create({
        baseURL: 'https://taltech.akaver.com/api/v1/TodoCategories/',
    });

    static async getAll(jwt: string): Promise<IResultObject<ICategory[]>> {
        try {
            const response = await CategoryService.httpClient.get<ICategory[]>("", {
                headers: {
                    "Authorization": "Bearer " + jwt
                }
            });

            if (response.status < 300) {
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

}
