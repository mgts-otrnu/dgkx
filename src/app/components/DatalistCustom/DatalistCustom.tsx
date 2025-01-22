import {createRef, RefObject, useState} from "react";

import "./DatalistCustom.scss";

interface Props {
    items: string[];
    id: string;
    placeholder: string;
    disabled: boolean;
    filter: boolean;
    defaultValue: string;
    onChange: (name: string, value: string) => void;
}

function DatalistCustom({items, id, placeholder, disabled, filter, defaultValue, onChange}: Props) {
    const [listItems, setListItems] = useState<string[]>(items);
    const [isListOpen, setListOpen] = useState<boolean>(false);

    const currentId: string = `datalist-custom-input-` + id;
    const name: string = currentId.split("-")[currentId.split("-").length - 1];

    function filterListItems(event: any) {
        const filteredItems: string[] = items.filter(item => item.includes(event.target.value));
        setListItems(filteredItems);
    }

    function onListItemClick(event: any): void {
        event.target.parentElement.querySelectorAll(".datalist-custom__list-item_checked").forEach((item: Element) => {
            item.classList.remove("datalist-custom__list-item_checked");
        });

        event.target.classList.add("datalist-custom__list-item_checked");

        const inputCurrentElement: HTMLElement | null = document.getElementById(currentId);

        if (inputCurrentElement) {
            (inputCurrentElement as HTMLInputElement).value = event.target.innerText;
            (inputCurrentElement as HTMLInputElement).blur();
        }
        onChange(name, event.target.innerText);

        setTimeout(() => {
            setListOpen(false);
        }, 100);
    }

    function onInputChange(event: any): void {
        filter && filterListItems(event);
        setListOpen(true);
        onChange(name, event.target.value);
    }

    return (
        <div className="datalist-custom w-100">
            <input className="form-control"
                   type="text"
                   id={currentId}
                   placeholder={placeholder}
                   defaultValue={defaultValue}
                   disabled={disabled}
                   autoComplete="off"
                   onClick={(event) => {
                       filter && filterListItems(event);
                       setListOpen(!isListOpen);
                   }}
                   onBlur={() => {
                       setTimeout(() => {
                           setListOpen(false);
                       }, 100);
                   }}
                   onChange={onInputChange}
            />

            <button type="button"
                    className={`${disabled ? "d-none" : ""}`}
                    onClick={() => {
                        const inputCurrentElement = document.getElementById(currentId);
                        !isListOpen && inputCurrentElement && inputCurrentElement.focus();
                        setListOpen(!isListOpen);
                    }}
            ></button>

            <ul className={`datalist-custom__list ${isListOpen ? "datalist-custom__list_show" : ""}`}>
                {listItems.map((item: string, index: number) => (
                    <li key={index} className="datalist-custom__list-item" onClick={onListItemClick}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default DatalistCustom;