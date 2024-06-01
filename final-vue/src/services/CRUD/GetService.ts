import axios from "axios";
import httpClient from "@/services/HttpClientInstance.ts";
import type { IResultObject } from "@/services/IResultObject.ts";
import type { IPriority } from "@/domain/IPriority.ts";
import type { ICategory } from "@/domain/ICategory.ts";
import type { ITask } from "@/domain/ITask.ts";

export default class GetService {
    private constructor() { }

    static async getTask(token: string) {
        return this.Get<ITask>(token, 'TodoTasks/');
    }

    static async getCategory(token: string) {
        return this.Get<ICategory>(token, 'TodoCategories');
    }

    static async getPriority(token: string) {
        return this.Get<IPriority>(token, 'TodoPriorities/');
    }

    static async getCategoryById(token: string, id: string): Promise<ICategory | undefined> {
        try {
            const response = await GetService.getCategory(token);

            if (response.data) {
                const category = response.data.find(category => category.id === id);
                return category;
            }
        } catch (error) {
            console.error(error);
        }

        return undefined;
    }

    static async getPriorityById(token: string, id: string): Promise<IPriority | undefined> {
        try {
            const response = await GetService.getPriority(token);

            if (response.data) {
                const priority = response.data.find(priority => priority.id === id);
                return priority;
            }
        } catch (error) {
            console.error(error);
        }

        return undefined;
    }

    static async getTaskById(token: string, id: string): Promise<ITask | undefined> {
        try {
            const response = await GetService.getTask(token);

            if (response.data) {
                const task = response.data.find(task => task.id === id);
                return task;
            }
        } catch (error) {
            console.error(error);
        }

        return undefined;
    }

    static async Get<T extends object>(token: string, keyword: string): Promise<IResultObject<T[]>> {
        try {

            // const httpClient = axios.create({
            //     baseURL: baseUrl,
            //     headers: {
            //         Authorization: 'Bearer ' + token,
            //     },
            // });

            const response = await httpClient.get<T[]>(keyword);

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