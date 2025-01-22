import {Dispatch, SetStateAction} from "react";
import {NavigateFunction} from "react-router-dom";
import {FLOOR_LINK} from "../config/config";

function levelDoubleClickHandler(event: any, setLevelItemCurrent: Dispatch<SetStateAction<"basement" | "floor" | "roof">>, navigate: NavigateFunction) {
    const link: string = event.currentTarget.id.includes("basement")
        ? FLOOR_LINK
        : event.currentTarget.id.includes("floor")
            ? FLOOR_LINK
            : FLOOR_LINK;

    const floor = event.currentTarget.id.split("-")[event.currentTarget.id.split("-").length - 1];
    setLevelItemCurrent(floor);

    navigate(link);
}

export default levelDoubleClickHandler;