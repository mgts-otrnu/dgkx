import {LevelsType} from "./levels.type";

export interface IncidentItemType {
    date: string,
    detector: string,
    id: string,
    level: "" | LevelsType,
    status: string,
    value: string
}