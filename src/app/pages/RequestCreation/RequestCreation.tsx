import {Dispatch, SetStateAction, useState} from "react";

import PageTitle from "../../components/PageTitle/PageTitle";
import InputDate from "../../components/InputDate/InputDate";

import {defaultRequestItem} from "../../../shared/config/default-request-item";

import {RequestItemType} from "../../../shared/types/request-Item.type";

import "./RequestCreation.scss";

function RequestCreation({requestItemsList, setRequestItemsList}: {
    requestItemsList: RequestItemType[],
    setRequestItemsList: Dispatch<SetStateAction<RequestItemType[]>>
}) {
    const [requestItem, setRequestItem] = useState<RequestItemType>(defaultRequestItem);

    function handleFormSubmit(event: any) {
        event.preventDefault();
        setRequestItemsList([...requestItemsList, requestItem]);

        const submitButton = document.getElementById("request-сreation-submit-button");

        if (submitButton) {
            submitButton.innerText = "Заявка создана";
            submitButton.setAttribute("disabled", "true");
        }

    }

    function onInputChange(event: any) {
        setRequestItem({
            ...requestItem,
            [event.target.name]: event.target.value,
        });
    }

    return (
        <>
            <PageTitle title="Создание заявки на доступ" prevLink="/list"/>
            <div className="request-сreation">
                <form className="request-сreation__form p-4" onSubmit={handleFormSubmit}>
                    <select name="org" className="form-select form-item" onChange={onInputChange}>
                        <option disabled selected>Выберите организацию</option>
                        <option value="ДЖКХ">ДЖКХ</option>
                    </select>
                    <input name="fio" type="text" className="form-control form-item" placeholder="ФИО представителя"
                           autoComplete="off" onChange={onInputChange}/>
                    <select name="position" className="form-select form-item" onChange={onInputChange}>
                        <option disabled selected>Выберите должность</option>
                        <option value="Специалист">Специалист</option>
                        <option value="Электрик">Электрик</option>
                    </select>
                    <input name="phone" type="text" className="form-control form-item"
                           autoComplete="off" placeholder="Телефон представителя" onChange={onInputChange}/>
                    <select name="target" className="form-select form-item" onChange={onInputChange}>
                        <option disabled selected>Цель доступа</option>
                        <option value="Ремонт">Ремонт</option>
                        <option value="Обслуживание">Обслуживание</option>
                        <option value="Устранение аварии">Устранение аварии</option>
                    </select>
                    <div className="request-сreation__date form-item" onChange={onInputChange}>
                        <InputDate name="dateCreation" id="input-access-from" onChange={onInputChange}/>
                        <InputDate name="dateAccess" id="input-access-to" onChange={onInputChange}/>
                    </div>
                    <div className="form-item request-сreation__comment">
                        <textarea name="comment" className="form-control" id="input-comment"
                                  onChange={onInputChange}></textarea>
                        <span>0 / 300</span>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-3" id="request-сreation-submit-button">Создать заявку</button>
                    <button type="button" className="btn w-100 request-сreation__qr-button" id="request-сreation-qr-button">Распечатать QR код</button>
                </form>
            </div>
        </>
    );
}

export default RequestCreation;