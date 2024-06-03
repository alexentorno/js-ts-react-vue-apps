import httpClient from "@/services/HttpClientInstance.ts";
import type { IResultObject } from "@/services/IResultObject.ts";

import type { IContest } from "@/domain/IContest.ts";
import type { IContestTeams } from "@/domain/IContestTeams.ts";
import type { IParticipate } from "@/domain/IParticipate.ts";

export default class GetService {
    private constructor() { }

    static async getContests() {
        return this.Get<IContest>('contest/contests');
    }

    static async getContestTeams(id: string) {
        return this.Get<IContestTeams>('contest/contestinfo/' + id);
    } 

    static async getTeamParticipation (id: string) {
        return this.Get<IParticipate>('contest/participate/' + id);
    }

    static async getContestById(contestId: string) : Promise<IContest | undefined> {
        try {
            const response = await GetService.getContests();

            if (response.data) {
                const contest = response.data.find(contest => contest.id === contestId);
                return contest;
            }
        } catch (error) {
            console.error(error);
        }

        return undefined;
    }
    
    static async getContestTeamsById(contestId: string) {
        try {
            const response = await this.Get<IContestTeams>('contest/contestinfo/' + contestId);

            if (response.data) {
                const contest = response.data;
                return contest;
            }
        } catch (error) {
            console.error(error);
        }

        return undefined;
    }

    static async Get<T extends object>(keyword: string): Promise<IResultObject<T[]>> {
        try {

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