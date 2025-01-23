import {HistoryItemType} from "../types/history-Item.type";

export const historyList: HistoryItemType[] = [
    {
        id: "s0",
        address: "ул. Правды, д.2",
        date: "02.12.2024, 19:56",
        event: true,
        name: "Датчик задымления 1",
        level: "Этаж 1",
        status: "Недопустимо",
        value: 6
    },
    {
        id: "s0",
        address: "ул. Правды, д.2",
        date: "02.12.2024, 19:56",
        event: false,
        name: "Датчик задымления 1",
        level: "Этаж 1",
        status: "Допустимо",
        value: 0
    },
    {
        id: "g1",
        address: "ул. Правды, д.2",
        date: "02.12.2024, 19:56",
        event: true,
        name: "Геркон 1",
        level: "Этаж 1",
        status: "Открыто",
        value: null
    },
    {
        id: "g1",
        address: "ул. Правды, д.2",
        date: "02.12.2024, 19:56",
        event: false,
        name: "Геркон 1",
        level: "Этаж 1",
        status: "Допустимо",
        value: null
    }
];