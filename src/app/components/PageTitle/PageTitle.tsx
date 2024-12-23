import arrow from "../../../assets/images/icons/left-arrow-primary.svg";
import {MONITORING_LINK} from "../../../shared/config/config";

import "./PageTitle.scss";

function PageTitle({title, prevLink, status}: { title: string, prevLink: string, status?: string }) {
    const statusValue = status === "draft" ? "Черновик" : status === "progress" ? "В работе" : "Завершена";

    return (
        <div className="page-title px-4 py-3">
            <a href={MONITORING_LINK} className="page-title__link">
                <img src={arrow} alt="Стрелка влево"/>
                Назад
            </a>
            <div className="page-title__title">
                {title}
                {status &&
                    <span className={`page-title__status                     
                        ${status === "draft" ? "page-title__status_draft" : status === "progress"
                            ? "page-title__status_progress" : "page-title__status_finished"}`}>
                        {statusValue}
                    </span>}
            </div>
        </div>
    )
}

export default PageTitle;