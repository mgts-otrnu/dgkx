import PageTitle from "../../components/PageTitle/PageTitle";

import {RequestItemType} from "../../../shared/types/request-Item.type";

import "./RequestEdit.scss";
import InputDate from "../../components/InputDate/InputDate";

function RequestEdit({requestItemCurrent}: {requestItemCurrent: RequestItemType}) {
    console.log(requestItemCurrent);
    function onInputChange() {

    }
    function handleFormSubmit() {

    }

    return (
        <>
            <PageTitle title={`Заявка на доступ №${requestItemCurrent.id}`} prevLink="/list" status={requestItemCurrent.status}/>
            <div className="request-edit">
                <form className="request-edit__form p-4" onSubmit={handleFormSubmit}>
                    <select name="org" className="form-select form-item" onChange={onInputChange} disabled defaultValue={requestItemCurrent.org}>
                        <option disabled>Выберите организацию</option>
                        <option value="ДЖКХ">ДЖКХ</option>
                    </select>
                    <input name="fio" type="text" className="form-control form-item" placeholder="ФИО представителя"
                           autoComplete="off" onChange={onInputChange} disabled defaultValue={requestItemCurrent.fio}/>
                    <select className="form-select form-item" disabled defaultValue={requestItemCurrent.position}>
                        <option disabled >Выберите должность</option>
                        <option value="Специалист">Специалист</option>
                        <option value="Электрик">Электрик</option>
                    </select>
                    <input name="phone" type="text" className="form-control form-item" disabled defaultValue={requestItemCurrent.phone}
                           autoComplete="off" placeholder="Телефон представителя" onChange={onInputChange}/>
                    <select name="target" className="form-select form-item" onChange={onInputChange} disabled defaultValue={requestItemCurrent.target}>
                        <option disabled>Цель доступа</option>
                        <option value="Ремонт">Ремонт</option>
                        <option value="Обслуживание">Обслуживание</option>
                        <option value="Устранение аварии">Устранение аварии</option>
                    </select>
                    <input name="dateAccess" type="text" className="form-control form-item" disabled defaultValue={requestItemCurrent.phone}
                           autoComplete="off" placeholder="Дата доступа до" onChange={onInputChange}/>
                    <div className="form-item request-edit__comment">
                        <textarea name="comment" className="form-control" id="input-comment" disabled defaultValue={requestItemCurrent.comment}
                                  onChange={onInputChange}></textarea>
                        <span>0 / 300</span>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-3" id="request-edit-submit-button">Сохранить</button>
                </form>
            </div>
        </>
    );
}

export default RequestEdit;