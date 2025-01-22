import {Dispatch, SetStateAction} from "react";
import {useNavigate} from "react-router-dom";

import {mkdDoubleClickHandler, setMkdItem} from "../../../shared/utils/mkdDoubleClickHandler";
import collapseAccordionItems from "../../../shared/utils/collapseAccordionItems";
import levelDoubleClickHandler from "../../../shared/utils/levelDoubleClickHandler";

import {MONITORING_LINK} from "../../../shared/config/config";

import {MkdItemType} from "../../../shared/types/mkd-Item.type";

import './AccordionAddress.scss';
import {regexOnlyNumbers} from "../../../shared/config/regex";
import {mkdLevels} from "../../../shared/config/mkdLevels";

interface Props {
    mkdItemsList: MkdItemType[];
    setMkdItemsList: Dispatch<SetStateAction<MkdItemType[]>>;
    levelItemCurrent: "basement" | "floor" | "roof";
    setLevelItemCurrent: Dispatch<SetStateAction<"basement" | "floor" | "roof">>;
    setMkdItemCurrent: Dispatch<SetStateAction<MkdItemType | undefined>>;
}

function AccordionAddress({mkdItemsList, setMkdItemsList, levelItemCurrent, setLevelItemCurrent, setMkdItemCurrent}: Props) {
    const navigate = useNavigate();

    function handleMainButtonClick(): void {
        const buttonMapElement: Element | null = document.getElementById("map-button");
        if (buttonMapElement) {
            buttonMapElement.classList.remove("collapsed");
            collapseAccordionItems(buttonMapElement);
        }

        navigate(MONITORING_LINK);
    }

    function handleMkdButtonClick(): void {
        const buttonMapElement: HTMLElement | null = document.getElementById("map-button");
        if (buttonMapElement) {
            buttonMapElement.classList.add("collapsed");
        }
    }

    function handleMkdButtonDoubleClick(event: any) {
        mkdDoubleClickHandler(event, mkdItemsList, setMkdItemCurrent, navigate);
        event.target.classList.remove("collapsed");
        document.getElementById(`collapse-mkd-${event.target.id.replace(/\D/g, "")}`)?.classList.add("show");
    }

    function handleItemInButtonDoubleClick(event: any): void {
        setMkdItem(event, mkdItemsList, setMkdItemCurrent)
        levelDoubleClickHandler(event, setLevelItemCurrent, navigate);
    }

    return (
        <div className="accordion accordion-flush" id="accordion">
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button accordion-button_hide-icon"
                            id="map-button"
                            type="button" onClick={handleMainButtonClick}>
                        Карта
                    </button>
                </h2>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button mkd-items__button"
                            id="ods-button"
                            type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse-ods" aria-expanded="true"
                            aria-controls="collapse-ods">
                        ОДС-042
                    </button>
                </h2>
                <div id="collapse-ods" className="accordion-collapse collapse mkd-items__collapse show"
                     data-bs-parent="#accordion">

                    <div className="accordion accordion-flush accordion_mkd" id="accordion-mkd-items">
                        {mkdItemsList.map((item: MkdItemType, index: number) => (
                            <div className={`accordion-item mkd mkd_${item.id}`} key={index}>
                                <h2 className="accordion-header">
                                    <button
                                        className={`accordion-button collapsed mkd__button mkd__button_${item.id}`}
                                        id={`mkd-button-${item.id}`}
                                        type="button" data-bs-toggle="collapse"
                                        data-bs-target={`#collapse-mkd-${item.id}`}
                                        aria-expanded="false"
                                        aria-controls={`collapse-mkd-${item.id}`}
                                        onClick={handleMkdButtonClick}
                                        onDoubleClick={handleMkdButtonDoubleClick}>
                                        {item.name}
                                    </button>
                                </h2>
                                <div id={`collapse-mkd-${item.id}`}
                                     className="accordion-collapse collapse">
                                    <div className="accordion-body items-in">
                                        {mkdLevels && mkdLevels.map((level: {
                                            name: string,
                                            value: string
                                        }, index: number) => (
                                            <div
                                                className={`item-in item-in_${item.id}
                                                ${item.status === "incident" && level.name === levelItemCurrent ? "item-in_incident" : ""}`}
                                                id={`item-in-${item.id}-${level.name}`}
                                                key={index}
                                                onDoubleClick={handleItemInButtonDoubleClick}>
                                                {level.value}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccordionAddress;