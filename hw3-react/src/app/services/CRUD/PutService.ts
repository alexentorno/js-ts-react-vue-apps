import axios from "axios";
import { IResultObject } from "../IResultObject";
import { ICategory } from "@/domain/ICategory";
import { IPriority } from "@/domain/IPriority";
import { ITask } from "@/domain/ITask";

export default class PutService {

    private constructor() { }

    static async Put<T extends object>(token: string, baseUrlWithId: string, data: T): Promise<IResultObject<T[]>> {
        try {

            const httpClient = axios.create({
                baseURL: baseUrlWithId,
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });

            let response = await httpClient.put<T[]>('', data);

            if (response.status < 300) {
                console.log(data);
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

    static async putCategory(token: string, id: string, data: ICategory) {
        return this.Put<ICategory>(token, 'https://taltech.akaver.com/api/v1/TodoCategories/' + id, data);
    }

    static async putPriority(token: string, id: string, data: IPriority) {
        return this.Put<IPriority>(token, 'https://taltech.akaver.com/api/v1/TodoPriorities/' + id, data);
    }

    static async putTask(token: string, id: string, data: ITask) {
        return this.Put<ITask>(token, 'https://taltech.akaver.com/api/v1/TodoTasks/' + id, data);
    }
}
