export interface IParticipate {
    "userTeam": {
        "id": string,
        "teamId": string,
        "name": string,
        "memberNames": string,
        "startDT": string,
        "finishDT": string,
    },
    "teamName": string,
    "startDT": string,
    "finishDT": string,
    "score": number,
    "bonus": number,
    "penalty": number,
    "finalScore": number,
    "markings": [
        {
        "checkPointId": string,
        "userTeamId": string,
        "lat": string,
        "lon": string,
        "dt": string
        }
    ]
}