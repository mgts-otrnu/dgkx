import {useNavigate} from "react-router-dom";

import PopupIncident from "../PopupIncident/PopupIncident";

import {HISTORY_LINK} from "../../../shared/config/config";

import {IncidentItemType} from "../../../shared/types/incident-Item.type";

import "./PopupIncidentsList.scss";
import {useState} from "react";

interface Props {
    onClose: () => void;
    onReadAllIncidents: () => void;
    incidentItems: IncidentItemType[];
    onIncidentItemClose: (event: any) => void;
}

function PopupIncidentsList({onClose, onReadAllIncidents, incidentItems, onIncidentItemClose}: Props) {
    const navigate = useNavigate();

    return (
      <div className="popup-incidents">
          <div className="popup-incidents__top">
              <div className="popup-incidents__title">Оповещения</div>
              <div className="popup-incidents__actions">
                  <button className="btn btn-light popup-incidents__button" onClick={onReadAllIncidents}>Прочитать все</button>
                  <button className="popup-incidents__close-button" onClick={onClose}></button>
              </div>
          </div>

          <div className="popup-incidents__body" id="popup-incidents-body">
              {incidentItems && incidentItems.map((incidentItem: IncidentItemType, index: number) => (
                  <PopupIncident key={index} onClose={onIncidentItemClose} incidentItem={incidentItem} />
              ))}
          </div>

          <div className="popup-incidents__bottom">
              <button className="btn btn-light popup-incidents__button w-100" onClick={() => navigate(HISTORY_LINK)}>Смотреть все</button>
          </div>

      </div>
    );
}

export default PopupIncidentsList;