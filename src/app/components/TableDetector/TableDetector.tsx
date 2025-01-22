import "./TableDetector.scss";
import {detectorItems} from "../../../shared/config/detector-items";
import {DetectorItemType} from "../../../shared/types/detector-Item.type";
import PaginationCustom from "../PaginationCustom/PaginationCustom";
import {useEffect, useState} from "react";

function TableDetector() {
    const [items, setItems] = useState<HTMLTableRowElement[]>([]);

    const titles: string[] = ["Датчик", "Этаж", "Статус", "Значение"];

    useEffect(() => {
        const tableElement: HTMLElement | null = document.getElementById("table-detector");
        if (tableElement) {
            const itemsElements: HTMLTableRowElement[] = Array.from(tableElement.getElementsByTagName('tr')).slice(1);
            setItems(itemsElements);
        }
    }, []);

    return (
        <>
            <table className="table table-striped table-bordered mb-0 table-detector" id="table-detector">
                <thead>
                <tr>
                    {titles.map((title: string, index: number) => (
                        <th key={index} className="table-detector__th p-3">{title}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {detectorItems.map((item: DetectorItemType, index: number) => (
                    <tr key={index}
                        className={`table-detector__tr table-detector__tr_${item.id} d-none`}
                        id={`table-detector-tr-${item.id}`}>
                        <td className="p-3">{item.name}</td>
                        <td className="p-3">{item.floor}</td>
                        <td className="p-3">{item.status}</td>
                        <td className="p-3">{item.value}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <PaginationCustom paginationItems={items} type="full" itemsPerPageInitial={10}/>
        </>
    );
}

export default TableDetector;