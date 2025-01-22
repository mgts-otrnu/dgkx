export const normal: "normal" = "normal";
export const incident: "incident" = "incident";
export type MkdStatusType = typeof normal | typeof incident;

export interface MkdItemType {
    id: string;
    address: string;
    name: string,
    left: number,
    top: number,
    status: MkdStatusType,
    home?: number
}

export interface SetterMkdItemType {
    key: string;
    value: string | number | MkdStatusType;
}