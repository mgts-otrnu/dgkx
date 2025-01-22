import {useEffect, useState} from "react";

import CalendarCustom from "../CalendarCustom/CalendarCustom";
import InputDateCustom from "../InputDateCustom/InputDateCustom";
import {
    convertDateToInputFormat, convertDateTypeToString,
    convertInputFormatToDateType
} from "../../../shared/utils/dateFormatActions";

import {DateType} from "../../../shared/types/date.type";

import "./InputDateSingle.scss";

function InputDateSingle({defaultDate, disabled, onChange}: {
    defaultDate: string,
    disabled: boolean,
    onChange: (name: "from" | "to" | "single", value: string) => void
}) {

    const [isCalendarOpen, setCalendarOpen] = useState<boolean>(false);
    const [date, setDate] = useState<DateType>({
        date: 0,
        month: (new Date).getMonth(),
        year: (new Date).getFullYear(),
        hour: 0,
        minute: 0
    });

    const setterDate = (dateValue: DateType): void => {
        setDate(dateValue);
    }

    function onInputChange(name: "from" | "to" | "single", value: string): void {
        if (value !== "") {
            setDate(convertInputFormatToDateType(value, date.hour, date.minute));
            onChange(name, value);
        } else {
            onChange(name, "");
        }
    }

    function closeByLayout() {
        setCalendarOpen(false);
    }

    useEffect(() => {
        const inputElement: HTMLElement | null = document.getElementById("input-date-custom-single");

        if (date.date !== 0) {
            onChange("single", convertDateTypeToString(date));
            if (inputElement) {
                (inputElement as HTMLInputElement).value = convertDateToInputFormat(convertDateTypeToString(date));
                inputElement.parentElement?.classList.remove("input-date-custom_placeholder");
            }
        } else {
            onChange("single", "");
            (inputElement as HTMLInputElement).value = "";
            inputElement?.parentElement?.classList.add("input-date-custom_placeholder");
        }
    }, [date]);


    return (
        <div className="input-date-single">
            {isCalendarOpen && <div className="input-date-custom__layout" onClick={closeByLayout}></div>}
            <InputDateCustom name="single"
                             defaultDate={""}
                             disabled={disabled}
                             onChange={onInputChange}
                             isCalendarOpen={isCalendarOpen}
                             setCalendarOpen={setCalendarOpen}/>

            {isCalendarOpen &&
                <div className="calendar-custom-wrapper">
                    <CalendarCustom type="single"
                                    dateMain={date as DateType}
                                    datePair={null}
                                    setterDate={setterDate}/>
                </div>
            }

        </div>
    );
}

export default InputDateSingle;