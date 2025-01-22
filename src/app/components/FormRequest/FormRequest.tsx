import {Dispatch, SetStateAction, useEffect, useState} from "react";

import DatalistCustom from "../DatalistCustom/DatalistCustom";
import InputDateDouble from "../InputDateDouble/InputDateDouble";

import {regexOnlyNumbers} from "../../../shared/config/regex";
import {REQUEST_STATUS_LIST} from "../../../shared/config/config";

import {RequestItemType, SetterRequestItemType} from "../../../shared/types/request-Item.type";

import "./FormRequest.scss";

interface Props {
    action: "create" | "view" | "edit";
    setAction: Dispatch<SetStateAction<"create" | "view" | "edit">>
    handleFormSubmit: (event: any) => void;
    requestItemCurrent: RequestItemType;
    requestItem: RequestItemType;
    setterRequest: ({key, value}: SetterRequestItemType) => void
}

function FormRequest({
                         action,
                         setAction,
                         handleFormSubmit,
                         requestItemCurrent,
                         requestItem,
                         setterRequest
                     }: Props) {

    const [isDisabled, setDisabled] = useState<boolean>(action === "view");

    // будем получать с бэка потом
    const orgs: string[] = ["ДЖКХ", "ЖКХ"];
    const positions: string[] = ["Специалист", "Электрик"];

    function onDataListChange(name: string, value: string): void {
        setterRequest({key: name, value: value});
    }

    function onDoubleDateChange(name: "from" | "to" | "single", value: string): void {
        if (name === "from") {
            requestItem.dateAccessFrom = value;
        } else {
            requestItem.dateAccessTo = value;
        }
    }

    function onPhoneChange(event: any) {
        const value = (event.target as HTMLInputElement).value;
        (event.target as HTMLInputElement).value = value.length < 3 ? "+7" : "+" + value.replace(regexOnlyNumbers, "");

        value.length === 12 && setterRequest({key: "phone", value: value});
    }

    function onDataChange(event: any): void {
        setterRequest({key: event.target.name, value: event.target.value});
    }

    useEffect(() => {
        action === "view" ? setDisabled(true) : setDisabled(false);

        if (action === "create") {
            const formElement: HTMLElement | null = document.getElementById("form-request");
            formElement && (formElement as HTMLFormElement).reset();
        }
    }, [action]);


    return (
        <form className="form-request p-4" id="form-request" onSubmit={handleFormSubmit}>
            <div className="form-request__top">
                <div className="form-request__left">
                    <label className="form-item w-100">
                        <DatalistCustom items={orgs}
                                        id="org"
                                        placeholder="Организация"
                                        disabled={isDisabled}
                                        filter={true}
                                        defaultValue={requestItemCurrent.org}
                                        onChange={onDataListChange}/>
                    </label>

                    <input name="fio"
                           type="text"
                           className="form-control form-item"
                           placeholder="ФИО представителя"
                           defaultValue={requestItemCurrent.fio}
                           disabled={isDisabled}
                           autoComplete="off"
                           onChange={onDataChange}/>


                    <label className="form-item w-100">
                        <DatalistCustom items={positions}
                                        id="position"
                                        placeholder="Должность"
                                        disabled={isDisabled}
                                        filter={true}
                                        defaultValue={requestItemCurrent.position}
                                        onChange={onDataListChange}/>
                    </label>

                    <input name="phone"
                           type="text"
                           className="form-control form-item"
                           placeholder="Телефон представителя"
                           defaultValue={requestItemCurrent.phone}
                           disabled={isDisabled}
                           autoComplete="off"
                           maxLength={12}
                           onFocus={(event) => {
                               const value = (event.target as HTMLInputElement).value;
                               (event.target as HTMLInputElement).value = value === "" ? "+7" : value;
                           }}
                           onBlur={(event) => {
                               const value = (event.target as HTMLInputElement).value;
                               (event.target as HTMLInputElement).value = value.length < 3 ? "" : value;
                           }}
                           onChange={onPhoneChange}/>

                    <select name="target"
                            className={`form-select form-item ${requestItemCurrent?.target === "" ? "form-select_default" : ""}`}
                            defaultValue={requestItemCurrent.target}
                            disabled={isDisabled}
                            onChange={onDataChange}>
                        <option disabled value="">Цель доступа</option>
                        <option value="Ремонт">Ремонт</option>
                        <option value="Обслуживание">Обслуживание</option>
                        <option value="Устранение аварии">Устранение аварии</option>
                    </select>

                    <div className="form-item">
                        <InputDateDouble defaultDateFrom={requestItemCurrent.dateAccessFrom}
                                         defaultDateTo={requestItemCurrent.dateAccessTo}
                                         disabled={isDisabled}
                                         onChange={onDoubleDateChange}/>

                    </div>

                    <div className="form-request__comment">
                        <textarea name="comment"
                                  className="form-control"
                                  id="input-comment"
                                  defaultValue={requestItemCurrent.comment}
                                  disabled={isDisabled}
                                  onChange={onDataChange}>
                        </textarea>
                        <span>0 / 300</span>
                    </div>

                    {action === "create" &&
                        <>
                            <button type="submit" className="btn btn-primary w-100 form-item"
                                    id="form-request-submit-button">
                                Создать заявку
                            </button>
                            <button type="button" className="btn w-100 form-request__qr-button form-item"
                                    id="form-request-qr-button">
                                Распечатать QR код
                            </button>
                        </>
                    }
                </div>
                {action !== "create" &&
                    <div className="form-request__right">
                        <select name="status"
                                className="form-select form-item form-request__status"
                                defaultValue={requestItemCurrent.status}
                                onChange={onDataChange}>
                            {REQUEST_STATUS_LIST.map((status: { name: string, title: string }, index: number) => (
                                <option className={`form-request__status-option 
                                            ${requestItem.status === status.name ? "form-request__status-option_" + status.name : ""}`}
                                        key={index}
                                        value={status.name}>
                                    {status.title}
                                </option>
                            ))}
                        </select>
                        <button type="button"
                                className="btn btn-light w-100 mb-3 form-item"
                                id="form-request-submit-button"
                                onClick={() => setAction("edit")}>
                            Редактировать заявку
                        </button>
                        <button type="button"
                                className="btn w-100 form-request__qr-button form-item"
                                id="form-request-qr-button">
                            Распечатать QR код
                        </button>
                        <button type="button" className="btn w-100 form-request__qr-button form-item"
                                id="form-request-qr-button">
                            Отправить QR на телефон
                        </button>
                    </div>
                }
            </div>

            {action !== "create" &&
                <button type="submit" className="btn btn-primary w-100 form-item" id="form-request-submit-button">
                    Сохранить
                </button>
            }
        </form>
    );
}

export default FormRequest;
