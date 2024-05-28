// import axios from "axios";
import httpClient from "@/services/HttpClientInstance.ts";

// const keywords = ['TodoCategories', 'TodoPriorities', 'TodoTasks'];

export default class DeleteService {

    private constructor() { }

    static async Delete(token: string, keyword: string) {
        try {

            /* const httpClient = axios.create({
                baseURL: baseUrlWithId,
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            }); */

            const response = await httpClient.delete(keyword);

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

    static async deleteCategory(token: string, id: string) {
        return this.Delete(token, 'TodoCategories/' + id);
    }

    static async deletePriority(token: string, id: string) {
        return this.Delete(token, 'TodoPriorities/' + id);
    }

    static async deleteTask(token: string, id: string) {
        return this.Delete(token, 'TodoTasks/' + id);
    }
}