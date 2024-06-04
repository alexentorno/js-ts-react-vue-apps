import httpClient from "@/services/HttpClientInstance.ts";
import type { IResultObject } from "@/services/IResultObject.ts";

import type { IContest } from "@/domain/IContest.ts";
import type { IContestTeams } from "@/domain/IContestTeams.ts";
import type { IParticipate } from "@/domain/IParticipate.ts";
import type { IUserTeamsResults } from "@/domain/IUserTeamsResults.ts";
import { ref } from "vue";

export default class GetService {
    private constructor() { }

    static async getContests() {
        return this.Get<IContest>('contest/contests');
    }

    static async getContestTeams(id: string) {
        return this.Get<IContestTeams>('contest/contestinfo/' + id);
    } 

    static async getTeamParticipation (userTeamId: string) {
        return this.Get<IParticipate>('contest/participate/' + userTeamId);
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

    // static async getContestTeamsByContestId(id: string) : Promise<IUserTeamsResults | undefined> {

    //     const result = ref<IUserTeamsResults[]>([]);
    //     const teams = ref<IContestTeams[]>([]);

    //     try {
    //         const response = await GetService.getContestTeams(id);
    //         teams.value.userTeams.forEach(userTeam => {
    //             const participateResponse = await GetService.getTeamParticipation(userTeam.id);
    //             if (participateResponse.data) {
    //                 result.value.push({
    //                     teamName: participateResponse.data.teamName,
    //                     startDT: participateResponse.data.startDT,
    //                     finishDT: participateResponse.data.finishDT,
    //                     score: participateResponse.data.score,
    //                     bonus: participateResponse.data.bonus,
    //                     penalty: participateResponse.data.penalty,
    //                     finalScore: participateResponse.data.finalScore} as IUserTeamsResults);
                
    //                 } 
    //     });
    //         if (response.data) {
    //             teams.value = response.data;
    //         }
            
    //     } catch (error: any) {

    //         console.error(error);
    //     }
    // }
    
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