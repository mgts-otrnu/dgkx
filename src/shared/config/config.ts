const MONITORING_LINK: string = "/monitoring";
const HISTORY_LINK: string = "/history";
const SERVICE_LINK: string = "/service";
const DOCUMENT_LINK: string = "/document";
const MKD_LINK: string = "/mkd";
const FLOOR_LINK: string = "/floor";
const CREATION_LINK: string = "/creation";
const LIST_LINK: string = "/list";
const EDIT_LINK: string = "/edit";

// Задержка срабатывания функции после смены компонента
const START_FUNCTION_DELAY: number = 50;

const MAIN_COMPONENT_NAME: string = "Main";
const FLOOR_COMPONENT_NAME: string = "Floor";
const PARKING_COMPONENT_NAME: string = "Parking";

const BASE_URL: string = "http://172.31.10.8:8080/sf/common";
// const BASE_URL: string = "http://172.29.11.10:8080/sf/common";
// const BASE_URL: string = "http://192.168.1.12:8081/sf/common";

const BASE_VIDEO_URL: string = "172.31.10.7:8889";
const BASE_REPORTS_WS_URL: string = "172.31.10.8:11000";

// const BASE_REPORTS_WS_URL: string = "192.168.1.12:11000";
// const BASE_REPORTS_WS_URL: string = "172.29.11.10:11000";
const ERROR_SERVER: string = "Ошибка. Нет связи с сервером. Попробуйте позже...";
const ERROR_DATA: string = "Ошибка обработки данных: ";

const VIDEO_MODAL_ID: string = "videoModal";
const ACCESS_POINT_MODAL_ID: string = "accessPointModal";
const PARKING_GATE_MODAL_ID: string = "parkingGateModal";
const WATER_METER_MODAL_ID: string = "waterMeterModal";

const FILTER_SVG_FROM_WHITE_TO_PRIMARY: string = "invert(51%) sepia(23%) saturate(4200%) hue-rotate(153deg) brightness(90%) contrast(101%)";

const IS_PROD_MODE: boolean = true;

const LAYOUT_COLOR: string = "#FFF8D6";
const LAYOUT_OPACITY: number = 0.1;

export {
    MONITORING_LINK,
    HISTORY_LINK,
    SERVICE_LINK,
    DOCUMENT_LINK,
    MKD_LINK,
    FLOOR_LINK,
    CREATION_LINK,
    LIST_LINK,
    EDIT_LINK,
    START_FUNCTION_DELAY,
    MAIN_COMPONENT_NAME,
    FLOOR_COMPONENT_NAME,
    PARKING_COMPONENT_NAME,
    BASE_URL,
    BASE_VIDEO_URL,
    BASE_REPORTS_WS_URL,
    ERROR_SERVER,
    ERROR_DATA,
    VIDEO_MODAL_ID,
    ACCESS_POINT_MODAL_ID,
    PARKING_GATE_MODAL_ID,
    WATER_METER_MODAL_ID,
    FILTER_SVG_FROM_WHITE_TO_PRIMARY,
    IS_PROD_MODE,
    LAYOUT_COLOR,
    LAYOUT_OPACITY
};