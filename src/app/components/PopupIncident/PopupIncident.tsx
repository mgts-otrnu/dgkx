import {useNavigate} from "react-router-dom";

import {CREATION_LINK, HISTORY_LINK} from "../../../shared/config/config";

import {IncidentItemType} from "../../../shared/types/incident-Item.type";

import "./PopupIncident.scss";
import {mkdItems} from "../../../shared/config/mkd-items";
import {MkdItemType} from "../../../shared/types/mkd-Item.type";

interface Props {
    onClose: (event: any) => void;
    incidentItem: IncidentItemType;
}

function PopupIncident({onClose, incidentItem}: Props) {
    const navigate = useNavigate();

    const level: string = incidentItem.level === "basement" ? "Подвал" : incidentItem.level === "floor" ? "1 этаж" : "Чердак";
    const id: string = incidentItem.id.split("-")[incidentItem.id.split("-").length - 1];
    const mkdItem: MkdItemType | undefined = mkdItems.find((mkd: MkdItemType) => mkd.id === id.split("/")[0]);

    return (
        <div className="popup-incident">
            <div className="popup-incident__aside"></div>
            <div className="popup-incident__content">
                <div className="popup-incident__header">
                    <div className="popup-incident__title">Инцидент</div>
                    <button className="popup-incident__close-button" id={`close-button-${id}`} onClick={onClose}></button>
                </div>
                <div className="popup-incident__body">
                    <div className="popup-incident__info">
                        <div className="popup-incident__info-title-items">
                            <p className="popup-incident__info-title">Здание</p>
                            <p className="popup-incident__info-title">Точка установки</p>
                            <p className="popup-incident__info-title">Дата и время</p>
                            <p className="popup-incident__info-title">Датчик</p>
                            <p className="popup-incident__info-title">Статус</p>
                        </div>
                        <div className="popup-incident__info-text-items">
                            <p className="popup-incident__info-text">{mkdItem ? mkdItem.address : ""}</p>
                            <p className="popup-incident__info-text">{level}</p>
                            <p className="popup-incident__info-text">{incidentItem.date}</p>
                            <p className="popup-incident__info-text">{incidentItem.detector}</p>
                            <p className="popup-incident__info-text">{incidentItem.status}</p>
                        </div>
                    </div>
                    <div className="popup-incident__actions">
                        <button className="btn btn-light popup-incident__button" onClick={() => navigate(HISTORY_LINK)}>Подробнее</button>
                        <button className="btn btn-primary popup-incident__button" onClick={() => navigate(CREATION_LINK)}>Создать заявку</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopupIncident;