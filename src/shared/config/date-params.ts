export const hours: string[] = Array.from({length: 24}, (_, i) => (i).toString());

export const minutes: string[] = Array.from({length: 60}, (_, i) => (i).toString().padStart(2, "0"));

export const weekdays: { name: string, value: number }[] = [
    {name: "Пн", value: 1},
    {name: "Вт", value: 2},
    {name: "Ср", value: 3},
    {name: "Чт", value: 4},
    {name: "Пт", value: 5},
    {name: "Сб", value: 6},
    {name: "Вс", value: 0}
];

export const months: string[] = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];