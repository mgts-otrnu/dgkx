import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import TableAddresses from "../../components/TableAddresses/TableAddresses";
import PopupIncidentsList from "../../components/PopupIncidentsList/PopupIncidentsList";
import {mkdDoubleClickHandler} from "../../../shared/utils/mkdDoubleClickHandler";

import mapPin from "../../../assets/images/icons/map/map-pin.svg"

import {floor} from "../../../shared/types/levels.type";
import {incident, MkdItemType, MkdStatusType, normal, SetterMkdItemType} from "../../../shared/types/mkd-Item.type";
import {IncidentItemType} from "../../../shared/types/incident-Item.type";

import './Main.scss';

interface Props {
    mkdItemsList: MkdItemType[];
    setMkdItemCurrent: Dispatch<SetStateAction<MkdItemType | undefined>>;
    setterMkdItem: ({key, value}: SetterMkdItemType) => void;
    incidentItems: IncidentItemType[];
    setIncidentItems: Dispatch<SetStateAction<IncidentItemType[]>>;
    idIncident: number;
    setIdIncident: Dispatch<SetStateAction<number>>;
}

function Main({
                  mkdItemsList, setMkdItemCurrent, setterMkdItem,
                  incidentItems, setIncidentItems,
                  idIncident, setIdIncident
              }: Props) {

    const navigate = useNavigate();
    const [isPopupIncidentsListOpen, setPopupIncidentsListOpen] = useState<boolean>(true);


    function onAddressDoubleClick(event: any): void {
        mkdDoubleClickHandler(event, mkdItemsList, setMkdItemCurrent, navigate);
    }

    function addIncidentItem(currentItem: MkdItemType): void {
        const date: Date = new Date();
        const currentDate: string = date.getDate().toString().padStart(2, "0") + "."
            + (date.getMonth() + 1).toString().padStart(2, "0") + "." + date.getFullYear() + ", "
            + date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0");

        const incidentCurrent: IncidentItemType = {
            date: currentDate,
            detector: "Датчик температуры",
            id: `${currentItem.id}/${idIncident}`,
            level: floor,
            status: "Недопустимо",
            value: "100град"
        }

        setIdIncident(idIncident + 1);
        setIncidentItems([incidentCurrent, ...incidentItems]);
        setPopupIncidentsListOpen(true);
    }

    function handleActionIncident(currentId: string, type: "add" | "delete" | "init"): void {
        const currentMkdItem: MkdItemType | undefined = mkdItemsList.find(item => item.id === currentId);

        if (currentMkdItem) {
            currentMkdItem.status = type === "add" || type === "init" ? incident : normal;
            type === "add" && addIncidentItem(currentMkdItem);
            type === "init" && document.getElementById(`${currentId}`)?.classList.add("mkd_incident");
        }

        const tableMkdElements: HTMLCollectionOf<Element> = document.getElementsByClassName("table-main__tr");
        const currentTableMkdElement: Element | undefined = Array.from(tableMkdElements).find(item => item.id.includes(currentId));
        (type === "add" || type === "init")
            ? currentTableMkdElement && currentTableMkdElement.classList.add("table-main__tr_incident")
            : currentTableMkdElement && currentTableMkdElement.classList.remove("table-main__tr_incident");
    }

    function handleAddIncident(event: any): void {
        const mkdId = event.currentTarget.id;
        handleActionIncident(mkdId, "add");
    }

    function handleClosePopupIncident(event: any): void {
        const idIncident = event.target.id.split("-")[event.target.id.split("-").length - 1];
        const filteredIncidentItems: IncidentItemType[] = incidentItems.filter((item: IncidentItemType) => item.id !== idIncident);

        setIncidentItems(filteredIncidentItems);
        filteredIncidentItems.length === 0 && handleClosePopupIncidentsList();

        const mkdId = idIncident.split("/")[0];
        const currentMkdIncidentItems: IncidentItemType[] = incidentItems.filter((item: IncidentItemType) => item.id.includes(mkdId));
        currentMkdIncidentItems.length === 1 && handleActionIncident(mkdId, "delete");
    }

    function handleClosePopupIncidentsList(): void {
        setPopupIncidentsListOpen(false);
    }

    function handleReadAllIncidents(): void {
        incidentItems.forEach(item => {
            const mkdId = item.id.split("/")[0];
            handleActionIncident(mkdId, "delete")
        })
        setIncidentItems([]);
    }

    useEffect(() => {
        incidentItems.forEach(item => {
            const mkdId = item.id.split("/")[0];
            handleActionIncident(mkdId, "init");
        });
    }, []);

    return (
        <div className="main" id="main">
            <div className="mkd-items">
                {mkdItemsList.map((item: MkdItemType, index: number) => (
                    <div key={index}
                         className={`mkd mkd_${item.id} ${item.status === "incident" ? "mkd_incident" : ""}`}
                         id={`${item.id}`} style={{left: item.left, top: item.top}}
                         title="Двойной клик для просмотра"
                         onClick={handleAddIncident}
                         onDoubleClick={onAddressDoubleClick}>
                        <img className="mkd__pin-image" src={mapPin} alt="Иконка указателя местоположения"/>
                        <p className="mkd__address">{item.address}</p>
                    </div>
                ))}
            </div>

            <div className="mkd-table">
                <TableAddresses/>
            </div>

            {(isPopupIncidentsListOpen && incidentItems.length > 0) &&
                <PopupIncidentsList onClose={handleClosePopupIncidentsList}
                                    onReadAllIncidents={handleReadAllIncidents}
                                    incidentItems={incidentItems}
                                    onIncidentItemClose={handleClosePopupIncident}/>}
        </div>
    );
}

export default Main;