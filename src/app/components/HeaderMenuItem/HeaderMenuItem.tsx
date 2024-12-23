import {Dispatch, SetStateAction} from "react";

import {Link} from "react-router-dom";
import {FILTER_SVG_FROM_WHITE_TO_PRIMARY} from "../../../shared/config/config";

import "./HeaderMenuItem.scss";

interface Props {
    setLinkCurrent: Dispatch<SetStateAction<string>>
    isLinkActive: boolean;
    link: string;
    nameLink: string;
    iconSrc: string
}

function HeaderMenuItem({setLinkCurrent, isLinkActive, link, nameLink, iconSrc}: Props) {
    function handleClick() {
        setLinkCurrent(link);
    }

    return (
        <li className="header__menu-item">
            <Link
                to={link}
                className={`header__menu-link ${isLinkActive ? "header__menu-link_active" : ""}`}
                onClick={handleClick}
            >
                <img className="header__menu-image"
                     src={iconSrc}
                     alt="Иконка пункта меню"
                     style={isLinkActive ? {filter: FILTER_SVG_FROM_WHITE_TO_PRIMARY} : {}}
                />
                {nameLink}
            </Link>
        </li>
    );
}

export default HeaderMenuItem;