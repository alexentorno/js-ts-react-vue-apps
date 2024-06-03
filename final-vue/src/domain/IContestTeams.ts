import type { IContest } from "./IContest.ts"

export interface IContestTeams {
  "contestInfo" : IContest,
  "userTeams": [
    {
      "id": string,
      "teamId": string,
      "name": string,
      "memberNames": string,
      "startDT": string,
      "finishDT": string
    }
  ],
  "teamMembers": string,
  "contestClasses": [
    {
      "key": string,
      "value": string
    }
  ] 
}


