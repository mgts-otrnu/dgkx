import React, {useState} from "react";
import {Route, BrowserRouter, Routes, Navigate} from "react-router-dom"

import 'bootstrap';

import Header from "./layout/Header/Header";
import Main from "./pages/Main/Main";
import MkdPage from "./pages/MkdPage/MkdPage";
import Floor from "./pages/Floor/Floor";
import RequestCreation from "./pages/RequestCreation/RequestCreation";
import RequestList from "./pages/RequestList/RequestList";
import RequestEdit from "./pages/RequestEdit/RequestEdit";
import Page404 from "./pages/Page404/Page404";

import {mkdItems} from "../shared/config/mkd-items";
import {requestList} from "../shared/config/request-list";
import {defaultRequestItem} from "../shared/config/default-request-item";

import {UserInfoType} from "../shared/types/user-info.type";
import {MkdItemType} from "../shared/types/mkd-Item.type";
import {RequestItemType} from "../shared/types/request-Item.type";

function App() {
    const [error, setError] = useState<string | null | undefined>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserInfoType | null>({userName: "User"});
    const [mkdItemsList, setMkdItemsList] = useState<MkdItemType[]>(mkdItems);
    const [mkdItemCurrent, setMkdItemCurrent] = useState<MkdItemType>();
    const [requestItemsList, setRequestItemsList] = useState<RequestItemType[]>(requestList);
    const [requestItemCurrent, setRequestItemCurrent] = useState<RequestItemType>(defaultRequestItem);

    return (
        <BrowserRouter>
            <Header userInfo={userInfo}/>
            <Routes>
                <Route path="/monitoring" element={<Main mkdItemsList={mkdItemsList} setMkdItemsList={setMkdItemsList} setMkdItemCurrent={setMkdItemCurrent}/>} />
                <Route path="/mkd" element={<MkdPage mkdItemsList={mkdItemsList} setMkdItemsList={setMkdItemsList} mkdItemCurrent={mkdItemCurrent}/>} />
                <Route path="/floor" element={<Floor />} />
                <Route path="/creation" element={<RequestCreation requestItemsList={requestItemsList} setRequestItemsList={setRequestItemsList}/>} />
                <Route path="/list" element={<RequestList requestItemsList={requestItemsList} setRequestItemCurrent={setRequestItemCurrent} />} />
                <Route path="/edit" element={<RequestEdit requestItemCurrent={requestItemCurrent}/>} />
                <Route path="/404" element={<Page404 />} />
                <Route path='/' element={<Navigate to='/monitoring' replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
