import {useNavigate} from "react-router-dom";

import {REQUEST_STATUS_LIST} from "../../../shared/config/config";

import arrow from "../../../assets/images/icons/left-arrow-primary.svg";

import {RequestStatusType} from "../../../shared/types/request-Item.type";

import "./PageTitle.scss";

function PageTitle({title, status}: { title: string, status?: RequestStatusType }) {
    const navigate = useNavigate();

    return (
        <div className="page-title px-4 py-3">
            <button className="page-title__link" onClick={() => navigate(-1)}>
                <img src={arrow} alt="Стрелка влево"/>
                Назад
            </button>
            <div className="page-title__title">
                {title}
                {status &&
                    <span className={`page-title__status                     
                        ${status === "draft" ? "page-title__status_draft" : status === "progress"
                            ? "page-title__status_progress" : "page-title__status_finished"}`}>
                        {REQUEST_STATUS_LIST.find(item => item.name === status)?.title}
                    </span>}
            </div>
        </div>
    )
}

export default PageTitle;