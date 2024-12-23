import {
    MONITORING_LINK,
    CREATION_LINK,
    LIST_LINK,
    HISTORY_LINK,
    SERVICE_LINK,
    DOCUMENT_LINK
} from "./config";

import homeIcon from "../../assets/images/icons/header-menu/home.svg";
import clockIcon from "../../assets/images/icons/header-menu/clock.svg";
import keyIcon from "../../assets/images/icons/header-menu/key.svg";
import phoneIcon from "../../assets/images/icons/header-menu/phones.svg";
import documentIcon from "../../assets/images/icons/header-menu/document.svg";
import editIcon from "../../assets/images/icons/header-menu/edit.svg";

export const headerMenuItems: { link: string, name: string, icon: string }[] = [
    {
        link: MONITORING_LINK,
        name: "Мониторинг",
        icon: homeIcon
    },
    {
        link: HISTORY_LINK,
        name: "Журнал событий",
        icon: clockIcon
    },
    {
        link: LIST_LINK,
        name: "Заявки на доступ",
        icon: keyIcon
    },
    {
        link: SERVICE_LINK,
        name: "Техническая поддержка",
        icon: phoneIcon
    },
    {
        link: DOCUMENT_LINK,
        name: "Отчетность",
        icon: documentIcon
    },
    {
        link: CREATION_LINK,
        name: "Заявка на доступ",
        icon: editIcon
    }
];
