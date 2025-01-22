const MONITORING_LINK: string = "/dgkx";
const HISTORY_LINK: string = "/dgkx/history";
const SERVICE_LINK: string = "/dgkx/service";
const DOCUMENT_LINK: string = "/dgkx/document";
const MKD_LINK: string = "/dgkx/mkd";
const FLOOR_LINK: string = "/dgkx/floor";
const CREATION_LINK: string = "/dgkx/creation";
const EDIT_LINK: string = "/dgkx/edit";
const LIST_LINK: string = "/dgkx/list";

const BASE_URL: string = "http://localhost:8080/sf/common";

const ERROR_SERVER: string = "Ошибка. Нет связи с сервером. Попробуйте позже...";
const ERROR_DATA: string = "Ошибка обработки данных: ";

const FILTER_SVG_FROM_WHITE_TO_PRIMARY: string = "invert(51%) sepia(23%) saturate(4200%) hue-rotate(153deg) brightness(90%) contrast(101%)";

const REQUEST_STATUS_LIST: { name: string, title: string }[] = [
    {name: "draft", title: "Черновик"},
    {name: "progress", title: "В работе"},
    {name: "finished", title: "Завершена"}
];

export {
    MONITORING_LINK,
    HISTORY_LINK,
    SERVICE_LINK,
    DOCUMENT_LINK,
    MKD_LINK,
    FLOOR_LINK,
    CREATION_LINK,
    EDIT_LINK,
    LIST_LINK,
    BASE_URL,
    ERROR_SERVER,
    ERROR_DATA,
    FILTER_SVG_FROM_WHITE_TO_PRIMARY,
    REQUEST_STATUS_LIST
};