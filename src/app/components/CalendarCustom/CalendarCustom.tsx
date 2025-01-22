import {createRef, RefObject, useEffect, useState} from "react";

import DatalistCustom from "../DatalistCustom/DatalistCustom";

import {convertParamsToDateType} from "../../../shared/utils/dateFormatActions";

import {minutes, hours, weekdays, months} from "../../../shared/config/date-params";

import prevIcon from "../../../assets/images/icons/calendar/arrow-prev.svg";
import nextIcon from "../../../assets/images/icons/calendar/arrow-next.svg";

import {DateType} from "../../../shared/types/date.type";

import "./CalendarCustom.scss";

interface Props {
    type: "from" | "to" | "single";
    dateMain: DateType;
    datePair: DateType | null;
    setterDate: (date: DateType) => void;
}

function CalendarCustom({type, dateMain, datePair, setterDate}: Props) {
    const yearRef: RefObject<HTMLInputElement> = createRef();

    const [dateInMonth, setDateInMonth] = useState<string[]>(getDateInMonth(dateMain.month, dateMain.year));
    const [dateMainTemp, setDateMainTemp] = useState<DateType>(dateMain);

    const setterDateMainTemp = ({key, value}: { key: string, value: number }): void => {
        setDateMainTemp({
            ...dateMainTemp,
            [key]: value,
        });
    }

    function getDateInMonth(month: number, year: number): string[] {
        const dayFirst: number = new Date(year, month, 1).getDay();
        const dayLast: number = 33 - new Date(year, month, 33).getDate();
        const emptyDays: string[] = Array.from({length: dayFirst !== 0 ? dayFirst - 1 : 6}, (_, i) => "");
        return emptyDays.concat(Array.from({length: dayLast}, (_, i) => (i + 1).toString()));
    }

    function compareDates(dateFirst: DateType, dateSecond: DateType): string {
        const fullDateFirst: Date = new Date(dateFirst.year, dateFirst.month, dateFirst.date);
        const fullDateSecond: Date = new Date(dateSecond.year, dateSecond.month, dateSecond.date);

        return fullDateFirst.getTime() === fullDateSecond.getTime()
            ? "equal"
            : fullDateFirst.getTime() > fullDateSecond.getTime()
                ? "more"
                : "less";
    }

    function getDateItemClassName(date: string): string {
        const dateToCompare: DateType = convertParamsToDateType(parseInt(date),
            dateMainTemp.month, dateMainTemp.year, dateMainTemp.hour, dateMainTemp.minute);

        return compareDates(dateToCompare, dateMain) === "equal"
        || (datePair && compareDates(dateToCompare, datePair) === "equal")
            ? "calendar-custom__date_primary"
            : "";
    }

    function getDateSpanClassName(date: string): string {
        const dateToCompare: DateType = convertParamsToDateType(parseInt(date),
            dateMainTemp.month, dateMainTemp.year, dateMainTemp.hour, dateMainTemp.minute);

        const className1: string = (type === "from"
            && compareDates(dateToCompare, dateMain) === "more"
            && (datePair && compareDates(dateToCompare, datePair) === "less"))
        || (type === "to"
            && (datePair && compareDates(dateToCompare, datePair) === "more")
            && compareDates(dateToCompare, dateMain) === "less")
            ? "calendar-custom__date_secondary"
            : "d-none";

        const className2: string = className1 === "calendar-custom__date_secondary" && date === "1"
            ? "calendar-custom__date_left-radius"
            : "";

        return className1 + " " + className2;
    }

    function handleMinutesChange(name: string, value: string): void {
        const date: DateType = convertParamsToDateType(dateMain.date, dateMain.month, dateMain.year, dateMain.hour, parseInt(value));
        setterDate(date);
        setterDateMainTemp({key: name, value: parseInt(value)});
    }

    function handleHoursChange(name: string, value: string): void {
        const date: DateType = convertParamsToDateType(dateMain.date, dateMain.month, dateMain.year, parseInt(value), dateMain.minute);
        setterDate(date);
        setterDateMainTemp({key: name, value: parseInt(value)});
    }

    function handleDateChange(event: any): void {
        const date: DateType = convertParamsToDateType(parseInt(event.target.innerText),
            dateMainTemp.month, dateMainTemp.year, dateMainTemp.hour, dateMainTemp.minute);
        setterDate(date);
        setterDateMainTemp({key: "date", value: parseInt(event.target.innerText)});
    }

    function handleMonthChange(event: any): void {
        const action = event.currentTarget.id.split("-")[event.currentTarget.id.split("-").length - 1];

        let month: number;
        let year: number;
        if (action === "prev") {
            month = dateMainTemp.month > 0 ? dateMainTemp.month - 1 : 11;
            year = dateMainTemp.month === 0 ? dateMainTemp.year - 1 : dateMainTemp.year;
        } else {
            month = dateMainTemp.month < 11 ? dateMainTemp.month + 1 : 0;
            year = dateMainTemp.month === 11 ? dateMainTemp.year + 1 : dateMainTemp.year;
        }

        if (yearRef.current) {
            yearRef.current.value = year.toString();
        }

        const date: DateType = convertParamsToDateType(dateMain.date, month, year, dateMain.hour, dateMain.minute);
        setDateMainTemp(date);

        setDateInMonth(getDateInMonth(month, year));
    }

    function handleYearChange(event: any): void {
        setterDateMainTemp({key: "year", value: parseInt(event.target.value)});
        setDateInMonth(getDateInMonth(dateMainTemp.month, parseInt(event.target.value)));
    }

    function resetDate() {
        setterDate({
            date: 0,
            month: (new Date).getMonth(),
            year: (new Date).getFullYear(),
            hour: 0,
            minute: 0
        });
    }

    useEffect(() => {
        setDateMainTemp(dateMain);
    }, [dateMain]);

    useEffect(() => {
        if (yearRef.current) {
            yearRef.current.value = dateMainTemp.year.toString();
        }
    }, [dateMainTemp.year]);

    return (
        <div className="calendar-custom">

            <div>
                <header className="calendar-custom__header">
                    <div className="calendar-custom__navigation">
                        <div className="calendar-custom__navigation_month">
                            <button type="button"
                                    id="calendar-custom-prev"
                                    className="calendar-custom__nav-button calendar-custom__nav-button_prev"
                                    onClick={handleMonthChange}>
                                <img src={prevIcon} alt="Стрелка влево"/>
                            </button>
                            <p className="calendar-custom__month mb-0">
                                {months[dateMainTemp.month].padStart(2, "0")}
                            </p>
                            <button type="button"
                                    id="calendar-custom-next"
                                    className="calendar-custom__nav-button calendar-custom__nav-button_next"
                                    onClick={handleMonthChange}>
                                <img src={nextIcon} alt="Стрелка вправо"/>
                            </button>
                        </div>

                        <input className="calendar-custom__navigation_year form-control me-3"
                               ref={yearRef}
                               defaultValue={dateMainTemp.year}
                               onChange={handleYearChange}/>
                    </div>
                </header>

                <div className="calendar-custom__body">
                    <ul className="calendar-custom__weekdays">
                        {weekdays.map((weekday: { name: string, value: number }, index: number) => (
                            <li key={index}>{weekday.name}</li>
                        ))}
                    </ul>
                    <ul className="calendar-custom__dates">
                        {dateInMonth.map((date: string, index: number) => (
                            <li key={index}
                                className={`calendar-custom__date ${getDateItemClassName(date)}`}
                                onClick={handleDateChange}
                            >
                                {type !== "single" &&
                                    <span className={`calendar-custom__date_span ${getDateSpanClassName(date)}`}></span>
                                }

                                {date}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {type === "single" &&
                <button className="calendar-custom__reset-button" onClick={resetDate}>Удалить</button>}

            {type !== "single" &&
                <div className="calendar-custom__footer">
                    <p className="mb-0">{type === "from" ? "Начало" : type === "to" ? "Окончание" : "Время"}</p>

                    <label className="calendar-custom__datalist">
                        <DatalistCustom items={hours}
                                        id={`${type}-hour`}
                                        placeholder=""
                                        disabled={false}
                                        filter={false}
                                        defaultValue={dateMain.hour.toString().padStart(2, "0")}
                                        onChange={handleHoursChange}/>
                    </label>

                    <label className="calendar-custom__datalist">
                        <DatalistCustom items={minutes}
                                        id={`${type}-minute`}
                                        placeholder=""
                                        disabled={false}
                                        filter={false}
                                        defaultValue={dateMain.minute.toString().padStart(2, "0")}
                                        onChange={handleMinutesChange}/>
                    </label>
                </div>
            }

        </div>
    );
}

export default CalendarCustom;

