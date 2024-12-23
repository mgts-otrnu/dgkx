import React, {useEffect, useState} from "react";

import HeaderMenuItem from "../../components/HeaderMenuItem/HeaderMenuItem";
import twoDigitsNumber from "../../../shared/utils/formatTwoDigitsNumber";

import {Popover} from "bootstrap";

import {headerMenuItems} from "../../../shared/config/header-menu-items";

import bellIcon from "../../../assets/images/icons/header-menu/bell.svg";
import logOutIcon from "../../../assets/images/icons/header-menu/log-out.svg";

import {UserInfoType} from "../../../shared/types/user-info.type";

import "./Header.scss"

function Header({userInfo}: { userInfo: UserInfoType | null }) {
    const [date, setDate] = useState<number>(0);
    const [month, setMonth] = useState<string>("");
    const [hours, setHours] = useState<string>("");
    const [minutes, setMinutes] = useState<string>("/");
    const [linkCurrent, setLinkCurrent] = useState<string>("/monitoring");
    const [headerMenuItemsImages, setHeaderMenuItemsImages] = useState<{ [k: string]: string }>({});

    function getDate(): void {
        const currentDate: Date = new Date();
        setDate(currentDate.getDate());
        setMonth(currentDate.toLocaleString("ru", {month: 'short'}));
        setHours(twoDigitsNumber(currentDate.getHours()));
        setMinutes(twoDigitsNumber(currentDate.getMinutes()));
    }

    setInterval((): void => {
        getDate();
    }, 1000);

    useEffect((): void => {
        getDate();
    }, [date, month, hours, minutes]);

    useEffect((): void => {
        setHeaderMenuItemsImages(Object.fromEntries(headerMenuItems.map(item => [item.name, item.icon])));

        const exampleEl = document.getElementById('popover-log-out') as HTMLElement;
        new Popover(exampleEl, {
            trigger: 'focus',
            container: 'body',
            placement: 'bottom',
            html: true,
            content: function() {
                return document.getElementById('popover-content')?.innerHTML;
            },
        });
    }, []);

    return (
        <header className="header">
            <div className="header__side_left">
                <div className="header__logo"></div>

                <nav className="header__menu">
                    <ul>
                        {headerMenuItems.map((item, index: number) => (
                            <HeaderMenuItem
                                key={index}
                                setLinkCurrent={setLinkCurrent}
                                isLinkActive={linkCurrent === item.link}
                                link={item.link}
                                nameLink={item.name}
                                iconSrc={headerMenuItemsImages[item.name]}/>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="header__side_right">
                <div className="header__date"><span>{hours}:{minutes}</span>{date}&nbsp;{month}</div>

                <button type="button">
                    <img
                        src={bellIcon}
                        alt="Иконка уведомлений"
                    />
                </button>
                <button tabIndex={-1} type="button" className="btn btn-secondary"
                        data-bs-toggle="popover" id="popover-log-out">
                    <img
                        src={logOutIcon}
                        alt="Иконка выхода из системы"
                    />
                </button>
                <div className="pop-in p-0" id="popover-content" style={{display: "none"}}>
                    {userInfo && <p className="mb-0 text-center fs-6">{userInfo.userName}</p>}
                    <a className="log-out-link" href="/monitoring">Выйти из системы</a>
                </div>
            </div>
        </header>
    );
}

export default Header;