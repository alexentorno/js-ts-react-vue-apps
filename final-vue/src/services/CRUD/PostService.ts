import httpClient from "@/services/HttpClientInstance.ts";
import type { IResultObject } from "@/services/IResultObject.ts";
import type { IRegisterTeam } from "@/domain/IRegisterTeam.ts";
import type { IMarking } from "@/domain/IMarking.ts";
import type { IMarkingResponse } from "@/domain/IMarkingResponse.ts";


export default class PostServise {

    private constructor() { }

    static async Post<T extends object>(keyword: string, data: T): Promise<IResultObject<T[]>> {
        try {

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

    static async registerTeamForContest(data: IRegisterTeam) {

        return this.Post<IRegisterTeam>('contest/register', data);
    }

    static async markCheckpoint(data: IMarking) {
        return this.Post<IMarkingResponse>('contest/marking', data);
    }

    

}