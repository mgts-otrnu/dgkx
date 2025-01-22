export const draft: "draft" = "draft";
export const progress: "progress" = "progress";
export const finished: "finished" = "finished";
export const cancel: "cancel" = "cancel";

export type RequestStatusType = typeof draft | typeof progress | typeof finished | typeof cancel;

export interface RequestItemType {
    comment: string,
    dateAccessFrom: string,
    dateAccessTo: string,
    dateCreation: string,
    fio: string,
    id: string,
    org: string,
    phone: string,
    position: string,
    status: RequestStatusType,
    target: string,
}

export interface SetterRequestItemType {
    key: string;
    value: string | RequestStatusType;
}