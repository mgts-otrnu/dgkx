import {useEffect, useState} from "react";

import PaginationCustom from "../PaginationCustom/PaginationCustom";
import sortByAddress from "../../../shared/utils/sortByAddress";

import {mkdItems} from "../../../shared/config/mkd-items";
import {MkdItemType} from "../../../shared/types/mkd-Item.type";

import "./TableMain.scss";

function TableMain() {
    const [items, setItems] = useState<HTMLTableRowElement[]>([]);

    useEffect(() => {
        const tableElement: HTMLElement | null = document.getElementById("table-main");
        if (tableElement) {
            const itemsElements: HTMLTableRowElement[] = Array.from(tableElement.getElementsByTagName('tr')).slice(1);
            setItems(itemsElements);
        }

        mkdItems.forEach((item: MkdItemType) => {
            const tableMkdElements: HTMLCollectionOf<Element> = document.getElementsByClassName("table-main__tr");
            const currentTableMkdElement: Element | undefined = Array.from(tableMkdElements).find(element => element.id.includes(item.id));
            currentTableMkdElement && item.status === "incident" && currentTableMkdElement.classList.add("table-main__tr_incident");
        });
    }, []);

    return (
        <>
            <table className="table table-striped table-bordered w-100 mb-0 table-main" id="table-main">
                <thead>
                <tr>
                    <th className="table-main__th">Адрес</th>
                    <th className="table-main__th">Инциденты</th>
                </tr>
                </thead>
                <tbody>
                {sortByAddress(mkdItems).map((item: MkdItemType, index: number) => (
                    <tr key={index}
                        className={`table-main__tr table-main__tr_${item.id} d-none`}
                        id={`table-main-tr-${item.id}`}>
                        <td>{item.address}</td>
                        <td className="table-main__td table-main__td_status">{item.status === "normal" ? "Нет" : "Да"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <PaginationCustom paginationItems={items} type="sm" itemsPerPageInitial={15}/>
        </>
    );
}

export default TableMain;