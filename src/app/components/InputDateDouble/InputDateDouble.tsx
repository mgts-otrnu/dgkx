import {useEffect, useState} from "react";

import InputDateCustom from "../InputDateCustom/InputDateCustom";
import CalendarCustom from "../CalendarCustom/CalendarCustom";

import {
    convertDateTypeToString,
    convertInputFormatToDateType,
    convertDateToInputFormat,
    getInitialDate
} from "../../../shared/utils/dateFormatActions";

import {DateType} from "../../../shared/types/date.type";

import "./InputDateDouble.scss";

function InputDateDouble({defaultDateFrom, defaultDateTo, disabled, onChange}: {
    defaultDateFrom: string,
    defaultDateTo: string,
    disabled: boolean,
    onChange: (name: "from" | "to" | "single", value: string) => void
}) {

    const [isCalendarOpen, setCalendarOpen] = useState<boolean>(false);
    const [dateFrom, setDateFrom] = useState<DateType>(getInitialDate("from", defaultDateFrom));
    const [dateTo, setDateTo] = useState<DateType>(getInitialDate("to", defaultDateTo));

    const setterDateFrom = (dateValue: DateType): void => {
        setDateFrom(dateValue);
    }
    const setterDateTo = (dateValue: DateType): void => {
        setDateTo(dateValue);
    }

    function onInputChange(name: "from" | "to"| "single", value: string): void {
        if (value !== "") {
            if (name === "from") {
                setDateFrom(convertInputFormatToDateType(value, dateFrom.hour, dateFrom.minute));
            } else {
                setDateTo(convertInputFormatToDateType(value, dateTo.hour, dateTo.minute));
            }

            onChange(name, value);
        } else {
            const inputElement: HTMLElement | null = document.getElementById(`input-date-custom-${name}`);

            if (inputElement) {
                const date: DateType = name == "from" ? dateFrom : dateTo;
                (inputElement as HTMLInputElement).value = convertDateToInputFormat(convertDateTypeToString(date));
            }
        }
    }

    function closeByLayout() {
        setCalendarOpen(false);
    }

    useEffect(() => {
        const inputElement: HTMLElement | null = document.getElementById("input-date-custom-from");

        if (inputElement) {
            (inputElement as HTMLInputElement).value = convertDateToInputFormat(convertDateTypeToString(dateFrom));
            inputElement.parentElement?.classList.remove("input-date-custom_placeholder");
        }

        onChange("from", convertDateTypeToString(dateFrom));
    }, [dateFrom]);

    useEffect(() => {
        const inputElement: HTMLElement | null = document.getElementById("input-date-custom-to");

        if (inputElement) {
            (inputElement as HTMLInputElement).value = convertDateToInputFormat(convertDateTypeToString(dateTo));
            inputElement.parentElement?.classList.remove("input-date-custom_placeholder");
        }

        onChange("to", convertDateTypeToString(dateTo));
    }, [dateTo]);

    return (
        <div className="input-date-double">
            {isCalendarOpen && <div className="input-date-custom__layout" onClick={closeByLayout}></div>}

                <div className="input-date-double__wrapper">
                    <InputDateCustom name="from"
                                     defaultDate={defaultDateFrom}
                                     placeholder="Дата доступа: от"
                                     disabled={disabled}
                                     onChange={onInputChange}
                                     isCalendarOpen={isCalendarOpen}
                                     setCalendarOpen={setCalendarOpen}/>
                    <InputDateCustom name="to"
                                     defaultDate={defaultDateTo}
                                     placeholder="до"
                                     disabled={disabled}
                                     onChange={onInputChange}
                                     isCalendarOpen={isCalendarOpen}
                                     setCalendarOpen={setCalendarOpen}/>
                </div>

                {isCalendarOpen &&
                    <div className="calendar-custom-wrapper calendar-custom-wrapper_double">
                        <CalendarCustom type="from"
                                        dateMain={dateFrom}
                                        datePair={dateTo}
                                        setterDate={setterDateFrom}/>

                        <CalendarCustom type="to"
                                        dateMain={dateTo}
                                        datePair={dateFrom}
                                        setterDate={setterDateTo}/>
                    </div>
                }
        </div>
    );
}

export default InputDateDouble;