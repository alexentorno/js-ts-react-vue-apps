import axios from "axios";
import httpClient from "@/services/HttpClientInstance.ts";
import type { IResultObject } from "@/services/IResultObject.ts";
import type { IPriority } from "@/domain/IPriority.ts";
import type { ICategory } from "@/domain/ICategory.ts";
import type { ITask } from "@/domain/ITask.ts";

export default class PostServise {

    private constructor() { }

    static async Post<T extends object>(token: string, keyword: string, data: T): Promise<IResultObject<T[]>> {
        try {

            // const httpClient = axios.create({
            //     baseURL: baseUrl,
            //     headers: {
            //         Authorization: 'Bearer ' + token,
            //     },
            // });

            const response = await httpClient.post<T[]>(keyword, data);

            if (response.status < 300) {
                return {
                    data: response.data,
                };
            }
            return {
                errors: [response.status.toString() + ' ' + response.statusText],
            };
        } catch (error: any) {

            return {
                errors: [JSON.stringify(error)],
            };
        }

    }

    static async postTask(token: string, data: ITask) {
        return this.Post<ITask>(token, 'TodoTasks/', data);
    }

    static async postCategory(token: string, data: ICategory) {
        return this.Post<ICategory>(token, 'TodoCategories/', data);
    }

    static async postPriority(token: string, data: IPriority) {
        return this.Post<IPriority>(token, 'TodoPriorities/', data);
    }

}