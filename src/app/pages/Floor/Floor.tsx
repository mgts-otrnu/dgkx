import PageTitle from "../../components/PageTitle/PageTitle";
import TableDetector from "../../components/TableDetector/TableDetector";

import {MkdItemType} from "../../../shared/types/mkd-Item.type";

import "./Floor.scss";

interface Props {
    mkdItemCurrent: MkdItemType | undefined;
    levelItemCurrent: "basement" | "floor" | "roof";
}

function Floor({mkdItemCurrent, levelItemCurrent}: Props) {
    const level: string = levelItemCurrent === "basement"
        ? "подвал"
        : levelItemCurrent === "floor"
            ? "1 этаж"
            : "чердак";

    return (
        <div className="floor">
            <PageTitle title={`г.Москва, ${mkdItemCurrent && mkdItemCurrent.address}, ${level}`} />
            <div className="floor__content">
                <div className="floor__plan">

                </div>
                <div className="floor__table">
                    <TableDetector/>
                </div>
            </div>
        </div>
    );
}

export default Floor;