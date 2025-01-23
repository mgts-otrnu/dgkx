import {Dispatch, SetStateAction} from "react";
import {useNavigate} from "react-router-dom";

import PageTitle from "../../components/PageTitle/PageTitle";
import TableBasic from "../../components/TableBasic/TableBasic";

import {EDIT_LINK} from "../../../shared/config/config";

import {RequestItemType} from "../../../shared/types/request-Item.type";

import "./RequestList.scss";

function RequestList({requestItemsList, setRequestItemCurrent}: {
    requestItemsList: RequestItemType[],
    setRequestItemCurrent: Dispatch<SetStateAction<RequestItemType>>
}) {
    const navigate = useNavigate();

    const titles: string[] = ["Номер", "Статус", "Организация", "ФИО представителя", "Телефон представителя",
        "Цель доступа", "Комментарий", "Дата доступа от", "Дата доступа до", "Дата создания"];

    const orgs: string[] = Array.from(new Set(getTableItems().map(item => item.org))).filter(item => item !== "");
    const fioList: string[] = Array.from(new Set(getTableItems().map(item => item.fio))).filter(item => item !== "");
    const phoneList: string[] = Array.from(new Set(getTableItems().map(item => item.phone))).filter(item => item !== "");
    const targets: string[] = Array.from(new Set(getTableItems().map(item => item.target))).filter(item => item !== "");

    const filterItems: { [key: string]: any }[] = [
        {title: "Организация", name: "org", value: orgs},
        {title: "ФИО", name: "fio", value: fioList},
        {title: "Телефон", name: "phone", value: phoneList},
        {title: "Цель доступа", name: "target", value: targets},
    ];

    function getTableItems(): { [key: string]: any }[] {
        return requestItemsList.map((item: { [key: string]: any }) => {
            return {
                id: item.id,
                status: item.status,
                org: item.org,
                fio: item.fio,
                phone: item.phone,
                target: item.target,
                comment: item.comment,
                dateAccessFrom: item.dateAccessFrom,
                dateAccessTo: item.dateAccessTo,
                dateCreation: item.dateCreation,
            };
        });
    }

    function handleRowDoubleClick(event: any) {
        const rowElementIdArr = event.currentTarget.id.split("-");
        const currentId: string = rowElementIdArr[rowElementIdArr.length - 1];
        const itemCurrent: RequestItemType | undefined = requestItemsList.find(item => item.id === currentId);
        itemCurrent && setRequestItemCurrent(itemCurrent);
        navigate(EDIT_LINK);
    }

    return (
        <>
            <PageTitle title="Заявки на доступ"/>
            <div className="request-list">
                <TableBasic tableName="request"
                            items={getTableItems()}
                            filterItems={filterItems}
                            titles={titles}
                            handleRowDoubleClick={handleRowDoubleClick}/>
            </div>
        </>
    );
}

export default RequestList;