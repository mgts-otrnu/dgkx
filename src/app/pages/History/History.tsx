import PageTitle from "../../components/PageTitle/PageTitle";
import TableBasic from "../../components/TableBasic/TableBasic";

import {historyList} from "../../../shared/config/history-list";
import {detectorStatusList} from "../../../shared/config/detector-status-list";

import "./History.scss";

function History() {
    const titles: string[] = ["Здание", "Точка установки", "Датчик", "Статус", "Значение", "Аварийное событие", "Дата и время"];

    const addresses: string[] = Array.from(new Set(getTableItems().map(item => item.address)))
        .filter(item => item !== "");
    const levels: string[] = ["Чердак", "Этаж 1", "Подвал"];
    const names: string[] = Array.from(new Set(detectorStatusList.map(item => item.name)))
        .filter(item => item !== "");
    const statusesDanger: string[] = Array.from(new Set(detectorStatusList.map(item => item.statusDanger)))
        .flat().filter(item => item !== "");
    const statusesNorm: string[] = Array.from(new Set(detectorStatusList.map(item => item.statusNorm)))
        .flat().filter(item => item !== "");
    const statuses: string[] = Array.from(new Set(statusesDanger.concat(statusesNorm))).sort();
    const values: string[] = Array.from(new Set(getTableItems().map(item => item.value)))
        .filter(item => item !== null).sort();
    const events: string[] = ["Аварийное", "Норма"];

    const filterItems: { [key: string]: any }[] = [
        {title: "Адрес", name: "address", value: addresses},
        {title: "Точка установки", name: "level", value: levels},
        {title: "Датчик", name: "name", value: names},
        {title: "Статус", name: "statusDetector", value: statuses},
        {title: "Значение", name: "value", value: values},
        {title: "Событие", name: "event", value: events},
    ];

    function getTableItems(): { [key: string]: any }[] {
        return historyList.map((item: { [key: string]: any }) => {
            return {
                address: item.address,
                level: item.level,
                name: item.name,
                status: item.status,
                value: item.value,
                event: item.event,
                date: item.date,
            };
        });
    }

    return (
        <div className="history">
            <PageTitle title="Журнал событий"/>
            <div className="history__table">
                <TableBasic tableName="history"
                            items={getTableItems()}
                            filterItems={filterItems}
                            titles={titles}/>
            </div>
        </div>
    );
}

export default History;