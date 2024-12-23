import {Dispatch, SetStateAction, useEffect, useState} from "react";

import PageTitle from "../../components/PageTitle/PageTitle";
import AsideLeft from "../../components/AsideLeft/AsideLeft";
import PaginationCustom from "../../components/PaginationCustom/PaginationCustom";

import {detectorItems} from "../../../shared/config/detector-items";

import humidity from "../../../assets/images/icons/mkd/humidity.svg";
import smoke from "../../../assets/images/icons/mkd/smoke.svg";
import doorContact from "../../../assets/images/icons/mkd/door-сontact.svg";
import camera from "../../../assets/images/icons/camera.svg";
import floor1 from "../../../assets/images/video/floor-1.png";
import floor2 from "../../../assets/images/video/floor-2.png";
import floor3 from "../../../assets/images/video/floor-3.png";
import basement from "../../../assets/images/video/basement-1.png";
import roof from "../../../assets/images/video/roof-1.png";

import {MkdItemType} from "../../../shared/types/mkd-Item.type";
import {DetectorItemType} from "../../../shared/types/detector-Item.type";

import "./MkdPage.scss";

interface Props {
    mkdItemsList: MkdItemType[];
    setMkdItemsList: Dispatch<SetStateAction<MkdItemType[]>>;
    mkdItemCurrent: MkdItemType | undefined;
}

function MkdPage(props: Props) {
    const [items, setItems] = useState<HTMLTableRowElement[]>([]);
    const titles: string[] = ["Датчик", "Этаж", "Статус", "Значение"];

    useEffect(() => {
        const tableElement: HTMLElement | null = document.getElementById("table-detector");
        if (tableElement) {
            const itemsElements: HTMLTableRowElement[] = Array.from(tableElement.getElementsByTagName('tr')).slice(1);
            setItems(itemsElements);
        }
    }, []);

    return (
        <div className="content-wrapper">
            <AsideLeft {...props} />
            <div className="mkd-page">
                <PageTitle title={`г.Москва, ${props.mkdItemCurrent && props.mkdItemCurrent.address}`} prevLink="/list"/>
                <div className="mkd-page__content">
                    <div className="mkd-page__info">
                        <div className="mkd-page__image">
                            <div className="mkd-page__image_basement">
                                <div className="mkd-page__detectors mkd-page__detectors_basement">
                                    <img src={humidity} alt="Датчик влажности"/>
                                    <img src={smoke} alt="Датчик задымления"/>
                                    <img src={doorContact} alt="Геркон"/>
                                </div>
                            </div>
                            <div className="mkd-page__image_floor">
                                <div className="mkd-page__detectors mkd-page__detectors_floor">
                                    <img src={humidity} alt="Датчик влажности"/>
                                    <img src={smoke} alt="Датчик задымления"/>
                                    <img src={doorContact} alt="Геркон"/>
                                </div>
                            </div>
                            <div className="mkd-page__image_roof">
                                <div className="mkd-page__detectors mkd-page__detectors_roof">
                                    <img src={humidity} alt="Датчик влажности"/>
                                    <img src={smoke} alt="Датчик задымления"/>
                                    <img src={doorContact} alt="Геркон"/>
                                </div>
                            </div>
                            <div className="mkd-page__camera mkd-page__camera_basement"><img src={camera} alt="Камера"/>
                            </div>
                            <div className="mkd-page__camera mkd-page__camera_floor"><img src={camera} alt="Камера"/>
                            </div>
                            <div className="mkd-page__camera mkd-page__camera_roof"><img src={camera} alt="Камера"/>
                            </div>
                        </div>
                        <div className="mkd-page__video-items">
                            <div className="mkd-page__video mkd-page__video_basement">
                                <div className="mkd-page__video-title">Камеры (Этаж 1)</div>
                                <div className="mkd-page__video-images">
                                    <img src={floor1} alt="Видео"/>
                                    <img src={floor2} alt="Видео"/>
                                    <img src={floor3} alt="Видео"/>
                                </div>
                            </div>
                            <div className="mkd-page__video mkd-page__video_floor">
                                <div className="mkd-page__video-title">Камеры (Подвал)</div>
                                <div className="mkd-page__video-images">
                                    <img src={basement} alt="Видео"/>
                                </div>
                            </div>
                            <div className="mkd-page__video mkd-page__video_roof">
                                <div className="mkd-page__video-title">Камеры (Чердак)</div>
                                <div className="mkd-page__video-images">
                                    <img src={roof} alt="Видео"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mkd-page__table">
                        <table className="table table-striped table-bordered mb-0 table-detector" id="table-detector">
                            <thead>
                            <tr>
                                {titles.map((title: string, index: number) => (
                                    <th key={index} className="table-detector__th p-3">{title}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {detectorItems.map((item: DetectorItemType, index: number) => (
                                <tr key={index}
                                    className={`table-detector__tr table-detector__tr_${item.id} d-none`}
                                    id={`table-detector-tr-${item.id}`}>
                                    <td className="p-3">{item.name}</td>
                                    <td className="p-3">{item.floor}</td>
                                    <td className="p-3">{item.status}</td>
                                    <td className="p-3">{item.value}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <PaginationCustom paginationItems={items} type="full" itemsPerPageInitial={10}/>
                </div>
            </div>
        </div>
    );
}

export default MkdPage;