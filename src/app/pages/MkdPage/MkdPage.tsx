import {Dispatch, SetStateAction} from "react";
import {useNavigate} from "react-router-dom";

import PageTitle from "../../components/PageTitle/PageTitle";
import TableDetector from "../../components/TableDetector/TableDetector";
import levelDoubleClickHandler from "../../../shared/utils/levelDoubleClickHandler";

import {mkdLevels} from "../../../shared/config/mkdLevels";

import humidity from "../../../assets/images/icons/mkd/humidity.svg";
import smoke from "../../../assets/images/icons/mkd/smoke.svg";
import doorContact from "../../../assets/images/icons/mkd/door-сontact.svg";
import camera from "../../../assets/images/icons/camera.svg";
import floor1 from "../../../assets/images/video/floor-1.png";
import floor2 from "../../../assets/images/video/floor-2.png";
import floor3 from "../../../assets/images/video/floor-3.png";
import basement from "../../../assets/images/video/basement-1.png";
import roof from "../../../assets/images/video/roof-1.png";

import {incident, MkdItemType} from "../../../shared/types/mkd-Item.type";

import "./MkdPage.scss";

interface Props {
    mkdItemCurrent: MkdItemType | undefined;
    setLevelItemCurrent: Dispatch<SetStateAction<"basement" | "floor" | "roof">>;
}

function MkdPage({mkdItemCurrent, setLevelItemCurrent}: Props) {
    const navigate = useNavigate();
    const floorVideo: string[] = [floor1, floor2, floor3, floor2, floor3];
    const basementVideo: string[] = [basement];
    const roofVideo: string[] = [roof];

    function handleLevelDoubleClick(event: any): void {
        levelDoubleClickHandler(event, setLevelItemCurrent, navigate);
    }

    return (
        <div className="mkd-page">
            <PageTitle title={`г.Москва, ${mkdItemCurrent && mkdItemCurrent.address}`}/>
            <div className="mkd-page__content">
                <div className="mkd-page__info">
                    <div className="mkd-page__levels">
                        {mkdLevels && mkdLevels.map((level: {
                            name: string,
                            value: string
                        }, index: number) => (
                            <>
                                <div key={index}
                                     className={`mkd-page__level mkd-page__level_${level.name} 
                                     ${mkdItemCurrent && mkdItemCurrent.status === incident && "mkd-page__level_incident"}`}
                                     id={`level-${mkdItemCurrent && mkdItemCurrent.id}-${level.name}`}
                                     onDoubleClick={handleLevelDoubleClick}>
                                    <div className={`mkd-page__detectors mkd-page__detectors_${level.name}`}>
                                        <img src={humidity} alt="Датчик влажности"/>
                                        <img src={smoke} alt="Датчик задымления"/>
                                        <img src={doorContact} alt="Геркон"/>
                                    </div>
                                </div>
                                <div className={`mkd-page__camera mkd-page__camera_${level.name}`}><img src={camera} alt="Камера"/>
                                </div>
                            </>
                        ))}
                    </div>
                    <div className="mkd-page__video-items">
                        {mkdLevels && mkdLevels.map((level: {
                            name: string,
                            value: string
                        }, index: number) => (
                            <div key={index} className={`mkd-page__video mkd-page__video_${level.name}`}>
                                <div className="mkd-page__video-title">Камеры ({level.value})</div>
                                <div className="mkd-page__video-images">
                                    {(level.name === "basement" ? basementVideo : level.name === "floor" ? floorVideo : roofVideo)
                                        .map((video: string, index: number) => (
                                        <img key={index} src={video} alt="Видео"/>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mkd-page__table">
                    <TableDetector/>
                </div>
            </div>
        </div>
    );
}

export default MkdPage;