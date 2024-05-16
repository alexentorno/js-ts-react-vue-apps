import axios from "axios";

export default class DeleteService {

    private constructor() { }

    static async Delete(token: string, baseUrlWithId: string) {
        try {

            const httpClient = axios.create({
                baseURL: baseUrlWithId,
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });

            let response = await httpClient.delete('');

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
        return this.Delete(token, 'https://taltech.akaver.com/api/v1/TodoCategories/' + id);
    }

    static async deletePriority(token: string, id: string) {
        return this.Delete(token, 'https://taltech.akaver.com/api/v1/TodoPriorities/' + id);
    }

    static async deleteTask(token: string, id: string) {
        return this.Delete(token, 'https://taltech.akaver.com/api/v1/TodoTasks/' + id);
    }
}