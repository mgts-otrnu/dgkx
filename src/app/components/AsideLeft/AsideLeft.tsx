import {Dispatch, SetStateAction} from "react";

import AccordionAddress from "../AccordionAddress/AccordionAddress";

import {mkdItems} from "../../../shared/config/mkd-items";

import {MkdItemType} from "../../../shared/types/mkd-Item.type";

import './AsideLeft.scss';

interface Props {
    mkdItemsList: MkdItemType[];
    setMkdItemsList: Dispatch<SetStateAction<MkdItemType[]>>;
    levelItemCurrent: "basement" | "floor" | "roof";
    setLevelItemCurrent: Dispatch<SetStateAction<"basement" | "floor" | "roof">>;
    setMkdItemCurrent: Dispatch<SetStateAction<MkdItemType | undefined>>;
}

function AsideLeft(props: Props) {
    function handleSearchChange(event: any) {
        const regEx = /[^А-Яа-я\d/]/gi;
        const filteredMkd: MkdItemType[] = mkdItems.filter((item: MkdItemType) => item.name.replace(regEx, '').includes(event.target.value.replace(regEx, '')));

        props.setMkdItemsList(filteredMkd);
    }

    return (
        <div className="aside-left">
            <div className="aside-left__search">
                <input type="text"
                       className="aside-left__input w-100 form-control"
                       placeholder="Поиск по адресу"
                       onChange={handleSearchChange}/>
            </div>
            <AccordionAddress {...props} />
        </div>
    );
}

export default AsideLeft;