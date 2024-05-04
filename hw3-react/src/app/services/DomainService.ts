import { IUserInfo } from "@/state/AppContext";
import axios from "axios";
import { IResultObject } from "./IResultObject";
import { IPriority } from "@/domain/IPriority";
import { ICategory } from "@/domain/ICategory";
import { ITask } from "@/domain/ITask";

export class GetService {
    private constructor() { }

    static async getTask(token: string) {
        return this.Get<ITask>(token, 'https://taltech.akaver.com/api/v1/TodoTasks/');
    }

    static async getCategory(token: string) {
        return this.Get<ICategory>(token, 'https://taltech.akaver.com/api/v1/TodoCategories/');
    }

    static async getPriority(token: string) {
        return this.Get<IPriority>(token, 'https://taltech.akaver.com/api/v1/TodoPriorities/');
    }

    static async Get<T extends object>(token: string, baseUrl: string): Promise<IResultObject<T[]>> {
        try {

            const httpClient = axios.create({
                baseURL: baseUrl,
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });

            const response = await httpClient.get<T[]>('');

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

}

export class PostServise {

    private constructor() { }

    static async Post<T extends object>(token: string, baseUrl: string, data: T): Promise<IResultObject<T[]>> {
        try {

            const httpClient = axios.create({
                baseURL: baseUrl,
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });

            let response = await httpClient.post<T[]>('', data);

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
        return this.Post<ITask>(token, 'https://taltech.akaver.com/api/v1/TodoTasks/', data);
    }

    static async postCategory(token: string, data: ICategory) {
        return this.Post<ICategory>(token, 'https://taltech.akaver.com/api/v1/TodoCategories/', data);
    }

    static async postPriority(token: string, data: IPriority) {
        return this.Post<IPriority>(token, 'https://taltech.akaver.com/api/v1/TodoPriorities/', data);
    }

}
