import React, {useState} from "react";
import {Route, Routes, Navigate, useLocation} from "react-router-dom"

import 'bootstrap';

import Header from "./layout/Header/Header";
import Main from "./pages/Main/Main";
import MkdPage from "./pages/MkdPage/MkdPage";
import Floor from "./pages/Floor/Floor";
import RequestAction from "./pages/RequestAction/RequestAction";
import RequestList from "./pages/RequestList/RequestList";
import Page404 from "./pages/Page404/Page404";
import AsideLeft from "./components/AsideLeft/AsideLeft";
import History from "./pages/History/History";

import sortByAddress from "../shared/utils/sortByAddress";

import {
    CREATION_LINK,
    FLOOR_LINK,
    HISTORY_LINK,
    EDIT_LINK,
    LIST_LINK,
    MKD_LINK,
    MONITORING_LINK
} from "../shared/config/config";

import {mkdItems} from "../shared/config/mkd-items";
import {requestList} from "../shared/config/request-list";
import {defaultRequestItem} from "../shared/config/default-request-item";
import {incidents} from "../shared/config/incidents";

import {UserInfoType} from "../shared/types/user-info.type";
import {MkdItemType, SetterMkdItemType} from "../shared/types/mkd-Item.type";
import {RequestItemType, SetterRequestItemType} from "../shared/types/request-Item.type";
import {IncidentItemType,} from "../shared/types/incident-Item.type";
import AlertCustom from "./components/AlertCustom/AlertCustom";


function App() {
    const location = useLocation();
    const pathName: string = location.pathname;

    const [error, setError] = useState<string | null | undefined>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserInfoType | null>({userName: "User"});
    const [mkdItemsList, setMkdItemsList] = useState<MkdItemType[]>(sortByAddress(mkdItems));
    const [mkdItemCurrent, setMkdItemCurrent] = useState<MkdItemType>();
    const [levelItemCurrent, setLevelItemCurrent] = useState<"basement" | "floor" | "roof">("floor");
    const [requestItemsList, setRequestItemsList] = useState<RequestItemType[]>(requestList);
    const [requestItemCurrent, setRequestItemCurrent] = useState<RequestItemType>(defaultRequestItem);
    const [incidentsList, setIncidentsList] = useState<IncidentItemType[]>(incidents);
    const [idIncident, setIdIncident] = useState<number>(0);
    const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
    const [alertText, setAlertText] = useState<string>("");
    const [alertType, setAlertType] = useState<"success" | "fail">("success");

    const setterRequestCurrent = ({key, value}: SetterRequestItemType): void => {
        setRequestItemCurrent({
            ...requestItemCurrent,
            [key]: value,
        });
    }

    const setterMkdItem = ({key, value}: SetterMkdItemType): void => {
        mkdItemCurrent && setMkdItemCurrent({
            ...mkdItemCurrent,
            [key]: value,
        });
    }

    function handleAlertOpen(type: "success" | "fail", text: string): void {
        setAlertText(text);
        setAlertType(type);
        setAlertOpen(true);

        const delay = type === "success" ? 2000 : 10000;

        setTimeout(() => {
            setAlertOpen(false);
        }, delay);
    }

    return (
        <>
            <Header userInfo={userInfo}/>
            <div className={`${pathName === MONITORING_LINK
                ? "content"
                : pathName === MKD_LINK || pathName === FLOOR_LINK
                    ? "content-wrapper"
                    : "content-wrapper flex-column"
            }`}>

                {(pathName === MONITORING_LINK || pathName === MKD_LINK || pathName === FLOOR_LINK) &&
                    <AsideLeft mkdItemsList={mkdItemsList}
                               setMkdItemsList={setMkdItemsList}
                               levelItemCurrent={levelItemCurrent}
                               setLevelItemCurrent={setLevelItemCurrent}
                               setMkdItemCurrent={setMkdItemCurrent}/>
                }

                <Routes>
                    <Route path={MONITORING_LINK}
                           element={<Main mkdItemsList={mkdItemsList}
                                          setMkdItemCurrent={setMkdItemCurrent}
                                          setterMkdItem={setterMkdItem}
                                          incidentItems={incidentsList}
                                          setIncidentItems={setIncidentsList}
                                          idIncident={idIncident}
                                          setIdIncident={setIdIncident}
                           />}
                    />
                    <Route path={MKD_LINK}
                           element={<MkdPage mkdItemCurrent={mkdItemCurrent}
                                             setLevelItemCurrent={setLevelItemCurrent}/>}
                    />
                    <Route path={FLOOR_LINK}
                           element={<Floor mkdItemCurrent={mkdItemCurrent}
                                           levelItemCurrent={levelItemCurrent}/>}
                    />
                    <Route path={HISTORY_LINK} element={<History/>}/>
                    <Route path={CREATION_LINK} element={<RequestAction requestItemCurrent={defaultRequestItem}
                                                                        setRequestItemCurrent={setRequestItemCurrent}
                                                                        requestItemsList={requestItemsList}
                                                                        setRequestItemsList={setRequestItemsList}
                                                                        handleAlertOpen={handleAlertOpen}/>}
                    />
                    <Route path={LIST_LINK} element={<RequestList requestItemsList={requestItemsList}
                                                                  setRequestItemCurrent={setRequestItemCurrent}/>}
                    />
                    <Route path={EDIT_LINK} element={<RequestAction requestItemCurrent={requestItemCurrent}
                                                                    setRequestItemCurrent={setRequestItemCurrent}
                                                                    requestItemsList={requestItemsList}
                                                                    setRequestItemsList={setRequestItemsList}
                                                                    handleAlertOpen={handleAlertOpen}/>}
                    />
                    <Route path="/404" element={<Page404/>}/>
                    <Route path='/' element={<Navigate to='/monitoring' replace/>}/>
                </Routes>

                {isAlertOpen && <AlertCustom type={alertType} text={alertText}/>}
            </div>
        </>
    );
}

export default App;
