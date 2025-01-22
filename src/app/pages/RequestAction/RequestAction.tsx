import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import PageTitle from "../../components/PageTitle/PageTitle";
import FormRequest from "../../components/FormRequest/FormRequest";

import {convertDateToString} from "../../../shared/utils/dateFormatActions";

import {fieldNames} from "../../../shared/config/field-names";
import {CREATION_LINK, EDIT_LINK} from "../../../shared/config/config";

import {RequestItemType, SetterRequestItemType} from "../../../shared/types/request-Item.type";
import {defaultRequestItem} from "../../../shared/config/default-request-item";

function RequestAction({
                           requestItemCurrent,
                           setRequestItemCurrent,
                           requestItemsList,
                           setRequestItemsList,
                           handleAlertOpen
                       }: {
    requestItemCurrent: RequestItemType,
    setRequestItemCurrent: Dispatch<SetStateAction<RequestItemType>>,
    requestItemsList: RequestItemType[],
    setRequestItemsList: Dispatch<SetStateAction<RequestItemType[]>>,
    handleAlertOpen: (type: "success" | "fail", text: string) => void
}) {
    const location = useLocation();
    const pathName: string = location.pathname;

    const [action, setAction] = useState<"create" | "view" | "edit">("create");
    const [requestItem, setRequestItem] = useState<RequestItemType>(requestItemCurrent);
    const setterRequest = ({key, value}: SetterRequestItemType): void => {
        setRequestItem({
            ...requestItem,
            [key]: value,
        });
    }

    function handleFormSubmit(event: any) {
        event.preventDefault();
        const emptyFields: string[] = [];

        for (const [key, value] of Object.entries(requestItem)) {
            if (value === "" && (key !== "comment" && key !== "dateCreation" && key !== "id" && key !== "status")) {
                emptyFields.push(key);
            }
        }

        if (emptyFields.length > 0) {
            const fields = emptyFields.map((field: string) => {
                return fieldNames.find(item => item.key === field)?.name;
            });

            // чтобы успела подгрузиться картинка
            setTimeout(() => {
                handleAlertOpen("fail", "Необходимо заполнить поля: " + fields.join(", "));
            }, 100);
        } else {
            if (requestItem.phone && requestItem.phone.match(/^\+7\d{10}$/g)![0].length === 12) {
                if (action === "create") {
                    const currentDate: Date = new Date();
                    requestItem.dateCreation = convertDateToString(currentDate);

                    setRequestItemsList([...requestItemsList, requestItem]);

                    const submitButton: HTMLElement | null = document.getElementById("form-request-submit-button");
                    if (submitButton) {
                        submitButton.innerText = "Заявка создана";
                        submitButton.setAttribute("disabled", "true");
                    }

                    // чтобы успела подгрузиться картинка
                    setTimeout(() => {
                        handleAlertOpen("success", "Заявка создана");
                    }, 100);
                } else {
                    if (JSON.stringify(requestItem) !== JSON.stringify(requestItemCurrent)) {
                        requestItemsList.forEach((item: RequestItemType, i: number) => {
                            if (item.id == requestItem.id) {
                                requestItemsList[i] = requestItem;
                            }
                        });

                        setRequestItemCurrent(requestItem);

                        // чтобы успела подгрузиться картинка
                        setTimeout(() => {
                            handleAlertOpen("success", "Изменения сохранены");
                        }, 100);
                    }
                }
            }
        }
    }

    useEffect(() => {
        pathName === CREATION_LINK ? setAction("create") : pathName === EDIT_LINK && setAction("view");
        if (pathName === CREATION_LINK) {
            const formElement: HTMLElement | null = document.getElementById("form-request");
            formElement && (formElement as HTMLFormElement).reset();

            setRequestItemCurrent(defaultRequestItem);
            setRequestItem(defaultRequestItem);
        }
    }, [pathName]);

    return (
        <>
            <PageTitle title={action === "create" ? "Создание заявки на доступ" : `Заявка №${requestItem.id}`}
                       status={action === "create" ? undefined : requestItem.status}
            />

            <div className="request-сreation">
                <FormRequest action={action}
                             setAction={setAction}
                             handleFormSubmit={handleFormSubmit}
                             requestItemCurrent={requestItemCurrent}
                             requestItem={requestItem}
                             setterRequest={setterRequest}/>
            </div>
        </>
    );
}

export default RequestAction;