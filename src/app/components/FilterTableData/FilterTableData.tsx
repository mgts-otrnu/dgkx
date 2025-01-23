import InputDateSingle from "../InputDateSingle/InputDateSingle";

import {REQUEST_STATUS_LIST} from "../../../shared/config/config";

import "./FilterTableData.scss";

function FilterTableData({tableName, filterItems, setterSearchValues}: {
    tableName: string,
    filterItems: { [key: string]: any }[],
    setterSearchValues: ({key, value}: { key: string, value: string }) => void
}) {

    function onIdInputChange(event: any, key: string): void {
        if (event.target.value !== "") {
            event.target.parentElement?.classList.add("control-wrapper_input");
        } else {
            event.target.parentElement?.classList.remove("control-wrapper_input");
        }

        setterSearchValues({key: key, value: event.target.value});
    }

    function onSelectChange(event: any, key: string): void {
        if (event.target.value !== "") {
            event.target.parentElement?.classList.remove("control-wrapper_placeholder");
        } else {
            key !== "statusRequest" && event.target.parentElement?.classList.add("control-wrapper_placeholder");
        }

        const newKey: string = (key === "statusRequest" || key === "statusDetector") ? "status" : key;
        const newValue = key === "event" && event.target.value === "Аварийное"
            ? "true"
            : key === "event" && event.target.value === "Норма"
                ? "false"
                : event.target.value;

        setterSearchValues({key: newKey, value: newValue});
    }

    function onDateChange(name: "from" | "to" | "single", value: string): void {
        const dateValue = value.split(",")[0];
        const inputElement: HTMLElement | null = document.getElementById("input-date-custom-single");

        if (dateValue !== "") {
            inputElement?.parentElement?.parentElement?.parentElement?.classList.add("control-wrapper_input");
        } else {
            inputElement?.parentElement?.parentElement?.parentElement?.classList.remove("control-wrapper_input");
        }

        const keyName: string = (tableName === "request" && name === "from")
            ? "dateFrom"
            : (tableName === "request" && name === "to")
                ? "dateTo"
                : (tableName === "request" && name === "single")
                    ? "dateCreation"
                    : "date";
        setterSearchValues({key: keyName, value: dateValue});
    }

    return (
        <div className="filter-table d-flex justify-content-between align-items-center">
            <div className="filter-table_left d-flex justify-content-between align-items-center gap-3">
                {tableName === "request" &&
                    <label className="control-wrapper" id="Номер заявки">
                        <input className="form-control request-list__number"
                               id="input-id"
                               type="text"
                               placeholder="Номер заявки"
                               onChange={(event) => onIdInputChange(event, "id")}/>
                    </label>}

                {tableName === "request" &&
                    <label className="control-wrapper control-wrapper_select" id="Статус">
                        <select className="form-select select-default"
                                name="statusRequest"
                                defaultValue=""
                                onChange={(event) => onSelectChange(event, "status")}>
                            <option value="">Все</option>
                            {REQUEST_STATUS_LIST.map((status: { name: string, title: string }, index: number) => (
                                <option key={index} value={status.name}>
                                    {status.title}
                                </option>
                            ))}
                        </select>
                    </label>}

                {filterItems.map((filterItem: { [key: string]: any }, index: number) => (
                    <label key={index}
                           id={filterItem.title}
                           className="control-wrapper control-wrapper_placeholder control-wrapper_select">
                        <select className="form-select select-default"
                                onChange={(event) => onSelectChange(event, filterItem.name)}>
                            <option value=""></option>
                            {filterItem.value.map((item: string | number, index: number) => (
                                <option key={index} value={item}>
                                    {filterItem.name === "value" ? item.toString() + "%" : item}
                                </option>
                            ))}
                        </select>
                    </label>
                ))}

                <label className="control-wrapper" id={tableName === "request" ? "Дата создания" : "Дата"}>
                    <InputDateSingle defaultDate=""
                                     placeholder={tableName === "request" ? "Дата создания" : "Дата"}
                                     disabled={false}
                                     onChange={onDateChange}/>

                </label>
            </div>
            <div className="filter-table_right ms-4">
                <input className="form-control filter-table__search"
                       id="input-search"
                       type="text"
                       placeholder="Поиск"
                       onChange={(event) => onSelectChange(event, "search")}/>
            </div>
        </div>
    )
}

export default FilterTableData;