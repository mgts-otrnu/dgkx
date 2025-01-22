import {Dispatch, SetStateAction, useEffect, useState} from "react";

import {convertDateToInputFormat} from "../../../shared/utils/dateFormatActions";

import "./InputDateCustom.scss";

function InputDateCustom({name, defaultDate, disabled, onChange, isCalendarOpen, setCalendarOpen}: {
    name: "from" | "to" | "single",
    defaultDate: string,
    disabled: boolean,
    onChange: (name: "from" | "to" | "single", value: string) => void,
    isCalendarOpen: boolean,
    setCalendarOpen: Dispatch<SetStateAction<boolean>>
}) {
    const id: string = `input-date-custom-${name}`;
    const placeholder: string = name === "from" ? "Дата доступа: от" : name === "to" ? "до" : "Дата создания";

    const [defaultValue, setDefaultValue] = useState<string>("");
    const [dateElement, setDateElement] = useState<HTMLElement | null>(null);

    function onInputChange(event: any): void {
        if (event.target.value !== "") {
            onChange(event.target.name, event.target.value);
            event.target.parentElement.classList.remove("input-date-custom_placeholder");
        } else {
            event.target.value = "";
            onChange(event.target.name, "");
            event.target.name === "single" && event.target.parentElement.classList.add("input-date-custom_placeholder");
        }
    }

    useEffect(() => {
        defaultDate && setDefaultValue(convertDateToInputFormat(defaultDate));
    }, [defaultDate]);

    useEffect(() => {
        const dateElement: HTMLElement | null = document.getElementById(`input-date-custom-wrapper-${name}`);
        dateElement && setDateElement(dateElement);
        dateElement && dateElement.classList.add("input-date-custom_placeholder");
    }, [dateElement]);

    return (
        <div className="input-date-custom w-100" id={`input-date-custom-wrapper-${name}`}>
            <input className="form-control"
                   name={name}
                   id={id}
                   type="date"
                   placeholder={placeholder}
                   defaultValue={defaultValue}
                   disabled={disabled}
                   maxLength={10}
                   onChange={onInputChange}/>

            {!disabled &&
                <button type="button"
                        className="input-date-custom__picker"
                        onClick={() => {
                            setCalendarOpen(!isCalendarOpen);
                        }}>
                </button>
            }

        </div>
    );
}

export default InputDateCustom;