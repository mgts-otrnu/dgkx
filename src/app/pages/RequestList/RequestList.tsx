import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import PageTitle from "../../components/PageTitle/PageTitle";
import PaginationCustom from "../../components/PaginationCustom/PaginationCustom";
import InputDate from "../../components/InputDate/InputDate";

import {RequestItemType} from "../../../shared/types/request-Item.type";

import "./RequestList.scss";
import {EDIT_LINK} from "../../../shared/config/config";

function RequestList({requestItemsList, setRequestItemCurrent}: {
    requestItemsList: RequestItemType[],
    setRequestItemCurrent: Dispatch<SetStateAction<RequestItemType>>
}) {
    const navigate = useNavigate();

    const [items, setItems] = useState<HTMLTableRowElement[]>([]);
    const titles: string[] = ["Номер", "Статус", "Организация", "ФИО представителя", "Телефон представителя", "Цель доступа", "Комментарий", "Дата доступа", "Дата создания"];
    const statuses: { name: string, title: string }[] = [
        {name: "all", title: "Все"},
        {name: "draft", title: "Черновик"},
        {name: "progress", title: "В работе"},
        {name: "finished", title: "Завершена"}
    ];
    const orgs: string[] = Array.from(new Set(requestItemsList.map(item => item.org)));
    const fioList: string[] = Array.from(new Set(requestItemsList.map(item => item.fio)));
    const phoneList: string[] = Array.from(new Set(requestItemsList.map(item => item.phone)));
    const targets: string[] = Array.from(new Set(requestItemsList.map(item => item.target)));

    function onNumberInputChange() {

    }

    function onSearchInputChange() {

    }

    function onDateInputChange() {

    }

    function focusDateInput() {

    }

    function blurDateInput() {

    }

    function onSelectChange() {

    }

    function handleRowDoubleClick(event: any) {
        const rowElementIdArr = event.currentTarget.id.split("-");
        const currentId: number = parseInt(rowElementIdArr[rowElementIdArr.length - 1]);
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
    }, []);


    return (
        <>
            <PageTitle title="Заявки на доступ" prevLink="/list"/>
            <div className="request-list">
                <div className="request-list__filter d-flex justify-content-between align-items-center">
                    <div className="request-list__filter_left d-flex justify-content-between align-items-center gap-3">
                        <input className="form-control request-list__number"
                               id="input-number"
                               type="text"
                               placeholder="Номер заявки"
                               onChange={onNumberInputChange}/>
                        <label className="select-wrapper select-wrapper_status">
                            <select className="form-select select-default"
                                    id="select-status"
                                    defaultValue="all"
                                    onChange={onSelectChange}>
                                {statuses.map((status: { name: string, title: string }, index: number) => (
                                    <option key={index} value={status.name}>
                                        {status.title}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="select-wrapper select-wrapper_orgs">
                            <select className="form-select select-default"
                                    id="select-orgs"
                                    onChange={onSelectChange}>
                                {orgs.map((org: string, index: number) => (
                                    <option key={index} value={org}>{org}</option>
                                ))}
                            </select>
                        </label>
                        <label className="select-wrapper select-wrapper_fio">
                            <select className="form-select select-default"
                                    id="select-fio"
                                    onChange={onSelectChange}>
                                {fioList.map((fio: string, index: number) => (
                                    <option key={index} value={fio}>{fio}</option>
                                ))}
                            </select>
                        </label>
                        <label className="select-wrapper select-wrapper_phone">
                            <select className="form-select select-default"
                                    id="select-phone"
                                    onChange={onSelectChange}>
                                {phoneList.map((phone: string, index: number) => (
                                    <option key={index} value={phone}>{phone}</option>
                                ))}
                            </select>
                        </label>
                        <label className="select-wrapper select-wrapper_target">
                            <select className="form-select select-default"
                                    id="select-target"
                                    onChange={onSelectChange}>
                                {targets.map((target: string, index: number) => (
                                    <option key={index} value={target}>{target}</option>
                                ))}
                            </select>
                        </label>
                        <InputDate name="creation" id="input-creation" onChange={onDateInputChange}/>
                    </div>
                    <div className="request-list__filter_right ms-4">
                        <input className="form-control request-list__search"
                               id="input-search"
                               type="text"
                               placeholder="Поиск"
                               onChange={onSearchInputChange}/>
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
                        {requestItemsList.map((req: RequestItemType, index: number) => (
                            <tr key={index}
                                className={`table-req__tr table-req__tr_${req.id} d-none`}
                                id={`table-req-tr-${req.id}`}
                                title="Двойной клик для редактирования"
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
                                <td className="p-3">{req.dateAccess}</td>
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