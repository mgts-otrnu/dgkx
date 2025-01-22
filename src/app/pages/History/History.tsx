import TableDetector from "../../components/TableDetector/TableDetector";
import PageTitle from "../../components/PageTitle/PageTitle";

import "./History.scss";
function History() {
    return (
        <div className="history">
            <PageTitle title="Журнал событий" />
            <div className="history__table">
                <TableDetector/>
            </div>
        </div>
    );
}

export default History;