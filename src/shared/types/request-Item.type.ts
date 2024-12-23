export interface RequestItemType {
    id: number;
    status: "draft" | "progress" | "finished";
    org: string,
    fio: string,
    position: string,
    phone: string,
    target: string,
    comment: string,
    dateAccess: string,
    dateCreation: string
}