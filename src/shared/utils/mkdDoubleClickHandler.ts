import {Dispatch, SetStateAction} from "react";
import {NavigateFunction} from "react-router-dom";
import {MKD_LINK} from "../config/config";
import {regexOnlyNumbers} from "../config/regex";
import {MkdItemType} from "../types/mkd-Item.type";


export function setMkdItem(event: any,
                           mkdItemsList: MkdItemType[],
                           setMkdItemCurrent: Dispatch<SetStateAction<MkdItemType | undefined>>): void {
    const currentId = event.currentTarget.id.replace(regexOnlyNumbers, "");
    const currentItem: MkdItemType | undefined = mkdItemsList.find(item => item.id === currentId);
    currentItem && setMkdItemCurrent(currentItem);
}

export function mkdDoubleClickHandler(event: any,
                               mkdItemsList: MkdItemType[],
                               setMkdItemCurrent: Dispatch<SetStateAction<MkdItemType | undefined>>,
                               navigate: NavigateFunction): void
{
    setMkdItem(event, mkdItemsList, setMkdItemCurrent)
    navigate(MKD_LINK);
}
