export const allow: "Допустимо" = "Допустимо";
export const notAllow: "Недопустимо" = "Недопустимо";
export const exceedCO2: "Превышен CO" = "Превышен CO";
export const normCO2: "CO в норме" = "CO в норме";
export const leak: "Протечка" = "Протечка"
export const norm: "В норме" = "В норме";
export const more: "Выше нормы" = "Выше нормы";
export const less: "Ниже нормы" = "Ниже нормы";
export const open: "Открыто" = "Открыто";
export const close: "Закрыто" = "Закрыто";
export const detention: "Удержание" = "Удержание";
export const breakOpen: "Взлом" = "Взлом";
export const full: "Заполнен" = "Заполнен";
export const noStatus: "" = "";

export type DetectorStatusType = typeof allow | typeof notAllow | typeof exceedCO2 | typeof normCO2 | typeof leak | typeof norm
   | typeof more | typeof less | typeof open | typeof close | typeof detention | typeof breakOpen | typeof full | typeof noStatus;


export interface DetectorItemType {
    id: string;
    name: string;
    floor: "Чердак" | "Этаж 1" | "Подвал";
    status: DetectorStatusType;
    value: number | null;
}