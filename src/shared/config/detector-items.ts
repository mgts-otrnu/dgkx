import {DetectorItemType} from "../types/detector-Item.type";

export const detectorItems: DetectorItemType[] = [
    {
        id: "s0",
        name: "Датчик задымления 1",
        floor: "Подвал",
        status: "CO2 в норме",
        value: 0
    },
    {
        id: "s1",
        name: "Датчик задымления 2",
        floor: "Этаж 1",
        status: "CO2 превышен",
        value: 10
    },
    {
        id: "g1",
        name: "Геркон 1",
        floor: "Чердак",
        status: "Закрыт",
        value: "Нет"
    },
    {
        id: "g2",
        name: "Геркон 2",
        floor: "Чердак",
        status: "Закрыт",
        value: "Нет"
    },
    {
        id: "h0",
        name: "Датчик влажности 1",
        floor: "Этаж 1",
        status: "CO2 в норме",
        value: 0
    },
    {
        id: "h1",
        name: "Датчик влажности 2",
        floor: "Этаж 1",
        status: "Допустимо",
        value: 30
    },
    {
        id: "h2",
        name: "Датчик влажности 3",
        floor: "Подвал",
        status: "Допустимо",
        value: 30
    },
    {
        id: "qr0",
        name: "Считыватель QR",
        floor: "Подвал",
        status: "Закрыт",
        value: "Нет"
    },
    {
        id: "qr1",
        name: "Считыватель QR",
        floor: "Подвал",
        status: "Работает",
        value: "Нет"
    },
    {
        id: "qr2",
        name: "Считыватель QR",
        floor: "Чердак",
        status: "Допустимо",
        value: 18
    },
]