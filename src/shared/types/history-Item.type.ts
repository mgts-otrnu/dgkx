import {DetectorStatusType} from "./detector-Item.type";

export interface HistoryItemType {
    id: string;
    address: string;
    date: string;
    event: boolean;
    name: string;
    level: "Чердак" | "Этаж 1" | "Подвал";
    status: DetectorStatusType;
    value: number | null;
}
