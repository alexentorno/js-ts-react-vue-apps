import type { IMarking } from "./IMarking.ts"

export interface IMarkingResponse {
    "statusOk": boolean,
    "statusCode": number,
    "message": string,
    "result": {
        "teamName": string,
        "startDT": string,
        "finishDT": string,
        "score": 0,
        "bonus": 0,
        "penalty": 0,
        "finalScore": 0,
        "markings": [
      IMarking
    ]
  }
}