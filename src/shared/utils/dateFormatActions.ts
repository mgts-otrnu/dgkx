import {regexOnlyNumbers} from "../config/regex";
import {DateType} from "../types/date.type";

export function convertDateToDateType(date: Date): DateType {
    return {
        date: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        hour: date.getHours(),
        minute: date.getMinutes()
    }
}

export function convertDateToString(date: Date): string {
    return date.getDate().toString().padStart(2, "0") + "." + (date.getMonth() + 1).toString().padStart(2, "0") + "."
        + date.getFullYear().toString().padStart(4, "0") + ", "
        + date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0");
}

export function convertStringToDateType(date: string): DateType {
    const dmy = date.split(",")[0];
    const time = date.split(",")[1];

    return {
        date: parseInt(dmy.split(".")[0]),
        month: parseInt(dmy.split(".")[1]) - 1,
        year: parseInt(dmy.split(".")[2]),
        hour: parseInt(time.split(":")[0].replace(regexOnlyNumbers, "")),
        minute: parseInt(time.split(":")[1])
    }
}

export function convertInputFormatToDateType(date: string, hour: number, minute: number): DateType {
    const dmy = date.split(",")[0];

    return {
        date: parseInt(dmy.split("-")[2]),
        month: parseInt(dmy.split("-")[1]) - 1,
        year: parseInt(dmy.split("-")[0]),
        hour: hour,
        minute: minute
    }
}

export function convertParamsToDateType(date: number, month: number, year: number, hour: number, minute: number): DateType {
    return {
        date: date,
        month: month,
        year: year,
        hour: hour,
        minute: minute
    }
}

export function convertDateTypeToString(date: DateType): string {
    return date.date.toString().padStart(2, "0") + "." + (date.month + 1).toString().padStart(2, "0") + "."
        + date.year.toString().padStart(4, "0") + ", " + date.hour.toString().padStart(2, "0") + ":" + date.minute.toString().padStart(2, "0");
}

export function convertDateToInputFormat(date: string) {
    const newDate: string[] = date.split(",")[0].split(".").reverse();
    return newDate[0].padStart(4, "0") + "-" + newDate[1].padStart(2, "0") + "-" + newDate[2].padStart(2, "0");
}

export function convertDateToViewFormat(date: string) {
    const newDate: string[] = date.split("-").reverse();
    return newDate[0].padStart(2, "0") + "." + newDate[1].padStart(2, "0") + "." + newDate[2].padStart(4, "0");
}

export function getInitialDate(name: "from" | "to", date: string): DateType {
    const currentDate: Date = new Date();

    if (date === "") {
        if (name === "from"){
            return convertDateToDateType(currentDate);
        } else {
            return convertParamsToDateType(currentDate.getDate(),
                currentDate.getMonth(), currentDate.getFullYear(), 23, 59);

        }
    } else {
        return convertStringToDateType(date);
    }
}