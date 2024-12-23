import {Dispatch, SetStateAction} from "react";

import dangerIcon from "../../../assets/images/icons/map/danger.svg";

import {MkdItemType} from "../../../shared/types/mkd-Item.type";

import './AccordionAddress.scss';

interface Props {
    mkdItemsList: MkdItemType[];
    setMkdItemsList: Dispatch<SetStateAction<MkdItemType[]>>;
}

function AccordionAddress(props: Props) {
    const mkdInItems: string[] = ["Подвал", "Этаж 1", "Чердак"];

    function handleMainButtonClick(): void {
        const buttonMapElement: HTMLElement | null = document.getElementById("map-button");
        const accordionButtonElements: HTMLCollectionOf<Element> = document.getElementsByClassName("accordion-button");

        Array.from(accordionButtonElements).forEach(element => {
            element.classList.add("collapsed");
        });

        if (buttonMapElement) {
            buttonMapElement.classList.remove("collapsed");
        }
    }

    function handleMkdButtonClick(): void {
        const buttonMapElement: HTMLElement | null = document.getElementById("map-button");
        if (buttonMapElement) {
            buttonMapElement.classList.add("collapsed");
        }
    }

    function handleItemInButtonClick(event: any): void {
        event.target.classList.add("item-in_danger");
        const dangerIconElement: HTMLImageElement = document.createElement("img");
        dangerIconElement.src = `${dangerIcon}`;
        dangerIconElement.style.marginLeft = "8px";
        event.target.append(dangerIconElement);
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
                <div id="collapse-ods" className="accordion-collapse collapse show"
                     data-bs-parent="#accordion">

                    <div className="accordion accordion-flush accordion_mkd" id="accordion-mkd-items">
                        {props.mkdItemsList.map((item: MkdItemType, index: number) => (
                            <div className={`accordion-item mkd mkd_${item.id}`} key={index}>
                                <h2 className="accordion-header">
                                    <button
                                        className={`accordion-button collapsed mkd__button mkd__button_${item.id}`}
                                        id={`mkd-button-${item.id}`}
                                        type="button" data-bs-toggle="collapse"
                                        data-bs-target={`#collapse-mkd-${index + 1}`}
                                        aria-expanded="false"
                                        aria-controls={`collapse-mkd-${index + 1}`}
                                        onClick={handleMkdButtonClick}>
                                        {item.name}
                                    </button>
                                </h2>
                                <div id={`collapse-mkd-${index + 1}`} className="accordion-collapse collapse"
                                     data-bs-parent="#accordion-mkd-items">
                                    <div className="accordion-body items-in">
                                        {mkdInItems && mkdInItems.map((itemIn: string, index: number) => (
                                            <div className={`item-in item-in_${item.id}`} key={index}
                                            onClick={handleItemInButtonClick}>
                                                {itemIn}
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