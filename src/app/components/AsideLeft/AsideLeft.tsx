import AccordionAddress from "../AccordionAddress/AccordionAddress";

import {mkdItems} from "../../../shared/config/mkd-items";

import './AsideLeft.scss';
import {MkdItemType} from "../../../shared/types/mkd-Item.type";
import {Dispatch, SetStateAction} from "react";

interface Props {
    mkdItemsList: MkdItemType[];
    setMkdItemsList: Dispatch<SetStateAction<MkdItemType[]>>;
}

function AsideLeft(props: Props) {
    function handleSearchChange(event: any) {
        console.log(event.target.value);
        const regEx = /[^А-Яа-я\d/]/gi;
        console.log(event.target.value.replace(regEx, ''));


        const filteredMkd: MkdItemType[] = mkdItems.filter((item: MkdItemType) => item.name.replace(regEx, '').includes(event.target.value.replace(regEx, '')));
        console.log(filteredMkd);
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