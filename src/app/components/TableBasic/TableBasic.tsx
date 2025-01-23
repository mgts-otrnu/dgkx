import {useEffect, useState} from "react";

import PaginationCustom from "../PaginationCustom/PaginationCustom";
import FilterTableData from "../FilterTableData/FilterTableData";

import {REQUEST_STATUS_LIST} from "../../../shared/config/config";

import attentionIcon from "../../../assets/images/icons/attention.svg";

import "./TableBasic.scss";
import {log} from "util";

function TableBasic({tableName, items, filterItems, titles, handleRowDoubleClick}: {
    tableName: "request" | "history";
    items: { [key: string]: any }[],
    filterItems: { [key: string]: any }[],
    titles: string[],
    handleRowDoubleClick?: (event: any) => void
}) {

    const [paginationItems, setPaginationItems] = useState<HTMLTableRowElement[]>([]);
    const [searchedValues, setSearchedValues] = useState<{ [key: string]: any }>({});
    const setterSearchValues = ({key, value}: { key: string, value: string }): void => {
        setSearchedValues({
            ...searchedValues,
            [key]: value,
        });
    }

    function findKeysToFilter() {
        const keys: string[] = [];
        for (const [key, value] of Object.entries(searchedValues)) {
            if (value) {
                keys.push(key);
            }
        }
        return keys;
    }

    function findIsEqualObject(row: { [key: string]: any }, searched: { [key: string]: any }): boolean {
        let equalObject: { [key: string]: any } = {};
        const filteredObj: { [key: string]: any } = {};

        for (const [key, value] of Object.entries(row)) {
            if (findKeysToFilter().includes(key)) {
                filteredObj[key] = value;
            }
        }

        if (JSON.stringify(filteredObj) === JSON.stringify(searched)) {
            equalObject = row;
        }

        return Object.keys(equalObject).length > 0;
    }

    function findIsSearchedObject(object: { [key: string]: any }): boolean {
        let filterWithSearch;

        filterWithSearch = Object.entries(object).filter(([key, value]) => {
            let newValue = value;
            if (tableName === "request" && key === "status") {
                newValue = REQUEST_STATUS_LIST.find(item => item.name === value)?.title;
            } else if (tableName === "history" && key === "event") {
                newValue = value === true ? "да" : "нет";
            } else if (tableName === "history" && key === "value" && value !== null) {
                newValue = value.toString() + "%";
            }

            return newValue?.toString().toLowerCase().includes(searchedValues.search.toString().toLowerCase())
        });

        return filterWithSearch.length > 0;
    }

    function filterRows(row: { [key: string]: any }): boolean {
        const isSearchedValues: number = findKeysToFilter().length;

        if (isSearchedValues === 0) {
            return true;
        } else {
            const rowWithSearchedValues: { [key: string]: any }[] = [];

            for (const [key, value] of Object.entries(row)) {
                if (searchedValues[key] && searchedValues[key].length) {
                    if (key !== "event" && key !== "value" && (value.includes(searchedValues[key]))) {
                        rowWithSearchedValues.push({[key]: value});
                    } else if (key === "event" && JSON.stringify(value) === searchedValues[key]) {
                        rowWithSearchedValues.push({[key]: value});
                    } else if (key === "value" && value !== null && (value.toString() + "%").includes(searchedValues[key])) {
                        rowWithSearchedValues.push({[key]: value});
                    }
                }
            }

            const searchedElement: {} = {};
            rowWithSearchedValues.forEach((key: { [key: string]: any }) => {
                Object.assign(searchedElement, key);
            });

            const isEqualObject: boolean = findIsEqualObject(row, searchedElement);
            if (searchedValues.search) {
                if (!isEqualObject) {
                    return false;
                } else {
                    return findIsSearchedObject(row);
                }
            } else {
                return isEqualObject;
            }
        }
    }

    useEffect(() => {
        const tableElement: HTMLElement | null = document.getElementById(`table-basic-${tableName}`);
        if (tableElement) {
            const itemsElements: HTMLTableRowElement[] = Array.from(tableElement.getElementsByTagName('tr')).slice(1);
            setPaginationItems(itemsElements);
        }
    }, [searchedValues]);

    return (
        <>
            <FilterTableData tableName={tableName} filterItems={filterItems} setterSearchValues={setterSearchValues}/>

            <div className="table-basic">
                <table className="table table-striped table-bordered mb-0 table-basic__table"
                       id={`table-basic-${tableName}`}>
                    <thead>
                    <tr>
                        {titles.map((title: string, index: number) => (
                            <th key={index} className="table-basic__th p-3">{title}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {items
                        .filter((row: { [key: string]: any }) => filterRows(row))
                        .map((item: { [key: string]: any }, index: number) => (
                            <tr key={index}
                                className={`table-basic__tr table-basic__tr_${item.id}
                            ${tableName === "history" && item.event === true ? "table-basic__tr_danger" : ""}`}
                                id={`table-basic-tr-${item.id}`}
                                title="Двойной клик для просмотра"
                                onDoubleClick={handleRowDoubleClick}>
                                {Object.entries(item).map(([key, value], index: number) => (
                                    <td key={index}
                                        className={`p-3 ${tableName === "request" && key === "status" ? "table-basic__td" : ""}                                                                        
                                    ${tableName === "request" && key === "status" && value === "draft"
                                            ? "table-basic__td_draft"
                                            : tableName === "request" && key === "status" && value === "progress"
                                                ? "table-basic__td_progress"
                                                : tableName === "request" && key === "status" && value === "finished"
                                                    ? "table-basic__td_finished" : ""}`}>

                                        {tableName === "history" && key === "value" && value !== null
                                            ? value + "%"
                                            : tableName === "history" && key === "value" && value === null
                                                ? "-"
                                                : tableName === "history" && key === "event" && value === false
                                                    ? "Нет"
                                                    : ((tableName === "request" && key !== "status")
                                                    || (tableName === "history" && key !== "value")) && value}

                                        {tableName === "request" && key === "status" &&
                                            <span>{value === "draft"
                                                ? "Черновик"
                                                : tableName === "request" && key === "status" && value === "progress"
                                                    ? "В работе"
                                                    : "Завершена"}</span>}

                                        {tableName === "history" && key === "event" && value === true &&
                                            <img src={attentionIcon} alt="Иконка восклицательный знак"/>}

                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <PaginationCustom paginationItems={paginationItems} type="full" itemsPerPageInitial={10}/>
        </>
    )
}

export default TableBasic;