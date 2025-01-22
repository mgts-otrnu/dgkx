import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import PageTitle from "../../components/PageTitle/PageTitle";
import PaginationCustom from "../../components/PaginationCustom/PaginationCustom";
import InputDateSingle from "../../components/InputDateSingle/InputDateSingle";

import {EDIT_LINK, REQUEST_STATUS_LIST} from "../../../shared/config/config";

import {RequestItemType} from "../../../shared/types/request-Item.type";

import "./RequestList.scss";

function RequestList({requestItemsList, setRequestItemCurrent}: {
    requestItemsList: RequestItemType[],
    setRequestItemCurrent: Dispatch<SetStateAction<RequestItemType>>
}) {
    const navigate = useNavigate();

    const [items, setItems] = useState<HTMLTableRowElement[]>([]);
    const [searchedValues, setSearchedValues] = useState<{ [key: string]: any }>({});

    const titles: string[] = ["Номер", "Статус", "Организация", "ФИО представителя", "Телефон представителя",
        "Цель доступа", "Комментарий", "Дата доступа от", "Дата доступа до", "Дата создания"];

    const orgs: string[] = Array.from(new Set(requestItemsList.map(item => item.org))).filter(item => item !== "");
    const fioList: string[] = Array.from(new Set(requestItemsList.map(item => item.fio))).filter(item => item !== "");
    const phoneList: string[] = Array.from(new Set(requestItemsList.map(item => item.phone))).filter(item => item !== "");
    const targets: string[] = Array.from(new Set(requestItemsList.map(item => item.target))).filter(item => item !== "");

    const setterSearchValues = ({key, value}: { key: string, value: string }): void => {
        setSearchedValues({
            ...searchedValues,
            [key]: value,
        });
    }

    function onSelectChange(event: any, keys: string): void {
        if (event.target.value !== "") {
            keys === "id"
                ? event.target.parentElement?.classList.add("control-wrapper_id")
                : event.target.parentElement?.classList.remove("control-wrapper_placeholder");
        } else {
            keys === "id"
                ? event.target.parentElement?.classList.remove("control-wrapper_id")
                : keys !== "status" && event.target.parentElement?.classList.add("control-wrapper_placeholder");
        }

        setterSearchValues({key: keys, value: event.target.value});
    }

    function onDateChange(name: "from" | "to" | "single", value: string): void {
        const dateValue = value.split(",")[0];
        const inputElement: HTMLElement | null = document.getElementById("input-date-custom-single");

        if (dateValue !== "") {
            inputElement?.parentElement?.parentElement?.parentElement?.classList.add("control-wrapper_creation");
        } else {
            inputElement?.parentElement?.parentElement?.parentElement?.classList.remove("control-wrapper_creation");
        }

        const keyName: string = name === "from" ? "dateFrom" : name === "to" ? "dateTo" : "dateCreation";
        setterSearchValues({key: keyName, value: dateValue});
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
            if (key === "status") {
                newValue = REQUEST_STATUS_LIST.find(item => item.name === value)?.title;
            }
            return newValue.toString().toLowerCase().includes(searchedValues.search.toString().toLowerCase())
        });

        return filterWithSearch.length > 0;
    }

    function filterRows(row: RequestItemType): boolean {
        const isSearchedValues: number = findKeysToFilter().length;

        if (isSearchedValues === 0) {
            return true;
        } else {
            const rowSearchedValues: { [key: string]: any }[] = [];

            for (const [key, value] of Object.entries(row)) {
                if (searchedValues[key] && searchedValues[key].length && value.includes(searchedValues[key])) {
                    rowSearchedValues.push({[key]: value});
                }
            }

            const searchedElement: {} = {};
            rowSearchedValues.forEach((key: { [key: string]: any }) => {
                Object.assign(searchedElement, key)
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

    function handleRowDoubleClick(event: any) {
        const rowElementIdArr = event.currentTarget.id.split("-");
        const currentId: string = rowElementIdArr[rowElementIdArr.length - 1];
        const itemCurrent: RequestItemType | undefined = requestItemsList.find(item => item.id === currentId);
        itemCurrent && setRequestItemCurrent(itemCurrent);
        navigate(EDIT_LINK);
    }

    useEffect(() => {
        const tableElement: HTMLElement | null = document.getElementById("table-req");
        if (tableElement) {
            const itemsElements: HTMLTableRowElement[] = Array.from(tableElement.getElementsByTagName('tr')).slice(1);
            setItems(itemsElements);
        }
    }, [searchedValues]);

    return (
        <>
            <PageTitle title="Заявки на доступ"/>
            <div className="request-list">
                <div className="request-list__filter d-flex justify-content-between align-items-center">
                    <div className="request-list__filter_left d-flex justify-content-between align-items-center gap-3">
                        <label className="control-wrapper">
                            <input className="form-control request-list__number"
                                   id="input-id"
                                   type="text"
                                   placeholder="Номер заявки"
                                   onChange={(event) => onSelectChange(event, "id")}/>
                        </label>
                        <label className="control-wrapper control-wrapper_status">
                            <select className="form-select select-default"
                                    id="select-status"
                                    defaultValue=""
                                    onChange={(event) => onSelectChange(event, "status")}>
                                <option value="">Все</option>
                                {REQUEST_STATUS_LIST.map((status: { name: string, title: string }, index: number) => (
                                    <option key={index} value={status.name}>
                                        {status.title}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="control-wrapper control-wrapper_placeholder control-wrapper_orgs">
                            <select className="form-select select-default"
                                    id="select-orgs"
                                    defaultValue=""
                                    onChange={(event) => onSelectChange(event, "org")}>
                                <option value=""></option>
                                {orgs.map((org: string, index: number) => (
                                    <option key={index} value={org}>{org}</option>
                                ))}
                            </select>
                        </label>
                        <label className="control-wrapper control-wrapper_placeholder control-wrapper_fio">
                            <select className="form-select select-default"
                                    id="select-fio"
                                    defaultValue=""
                                    onChange={(event) => onSelectChange(event, "fio")}>
                                <option value=""></option>
                                {fioList.map((fio: string, index: number) => (
                                    <option key={index} value={fio}>{fio}</option>
                                ))}
                            </select>
                        </label>
                        <label className="control-wrapper control-wrapper_placeholder control-wrapper_phone">
                            <select className="form-select select-default"
                                    id="select-phone"
                                    defaultValue=""
                                    onChange={(event) => onSelectChange(event, "phone")}>
                                <option value=""></option>
                                {phoneList.map((phone: string, index: number) => (
                                    <option key={index} value={phone}>{phone}</option>
                                ))}
                            </select>
                        </label>
                        <label className="control-wrapper control-wrapper_placeholder control-wrapper_target">
                            <select className="form-select select-default"
                                    id="select-target"
                                    defaultValue=""
                                    onChange={(event) => onSelectChange(event, "target")}>
                                <option value=""></option>
                                {targets.map((target: string, index: number) => (
                                    <option key={index} value={target}>{target}</option>
                                ))}
                            </select>
                        </label>
                        <label className="control-wrapper">
                            <InputDateSingle defaultDate=""
                                             disabled={false}
                                             onChange={onDateChange}/>

                        </label>
                    </div>
                    <div className="request-list__filter_right ms-4">
                        <input className="form-control request-list__search"
                               id="input-search"
                               type="text"
                               placeholder="Поиск"
                               onChange={(event) => onSelectChange(event, "search")}/>
                    </div>
                </div>

                <div className="request-list__table">
                    <table className="table table-striped table-bordered mb-0 table-req" id="table-req">
                        <thead>
                        <tr>
                            {titles.map((title: string, index: number) => (
                                <th key={index} className="table-req__th p-3">{title}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {requestItemsList
                            .filter((row: RequestItemType) => filterRows(row))
                            .map((req: RequestItemType, index: number) => (
                                <tr key={index}
                                    className={`table-req__tr table-req__tr_${req.id}`}
                                    id={`table-req-tr-${req.id}`}
                                    title="Двойной клик для просмотра"
                                    onDoubleClick={handleRowDoubleClick}>
                                    <td className="p-3">{req.id}</td>
                                    <td className={`table-req__td p-3
                                ${req.status === "draft"
                                        ? "table-req__td_draft"
                                        : req.status === "progress"
                                            ? "table-req__td_progress"
                                            : "table-req__td_finished"
                                    }`}>
                                        <span>{req.status === "draft" ? "Черновик" : req.status === "progress" ? "В работе" : "Завершена"}</span>
                                    </td>
                                    <td className="p-3">{req.org}</td>
                                    <td className="p-3">{req.fio}</td>
                                    <td className="p-3">{req.phone}</td>
                                    <td className="p-3">{req.target}</td>
                                    <td className="p-3">{req.comment}</td>
                                    <td className="p-3">{req.dateAccessFrom}</td>
                                    <td className="p-3">{req.dateAccessTo}</td>
                                    <td className="p-3">{req.dateCreation}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <PaginationCustom paginationItems={items} type="full" itemsPerPageInitial={10}/>
            </div>
        </>
    );
}

export default RequestList;