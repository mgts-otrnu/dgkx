import {Dispatch, SetStateAction} from "react";
import {useNavigate} from "react-router-dom";

import AsideLeft from "../../components/AsideLeft/AsideLeft";
import TableMain from "../../components/TableMain/TableMain";

import {MKD_LINK} from "../../../shared/config/config";

import mapPin from "../../../assets/images/icons/map/map-pin.svg"

import {MkdItemType} from "../../../shared/types/mkd-Item.type";

import './Main.scss';

interface Props {
    mkdItemsList: MkdItemType[];
    setMkdItemsList: Dispatch<SetStateAction<MkdItemType[]>>;
    setMkdItemCurrent: Dispatch<SetStateAction<MkdItemType | undefined>>;
}

function Main(props: Props) {
    const navigate = useNavigate();

    function handleAddressClick(event: any) {
        const currentId = event.currentTarget.id;
        const currentItem: MkdItemType | undefined = props.mkdItemsList.find(item => item.id === currentId);
        currentItem && props.setMkdItemCurrent(currentItem);
        navigate(MKD_LINK);
    }

    return (
        <div className="content">
            <AsideLeft {...props} />
            <div className="main" id="main">
                <div className="mkd-items">
                    {props.mkdItemsList.map((item: MkdItemType, index: number) => (
                        <div key={index}
                             className={`mkd mkd_${item.id}`}
                             id={`${item.id}`} style={{left: item.left, top: item.top}}
                             title="Двойной клик для просмотра"
                             onDoubleClick={handleAddressClick}>
                            <img className="mkd__pin-image" src={mapPin} alt="Иконка указателя местоположения"/>
                            <p className="mkd__address">{item.address}</p>
                        </div>
                    ))}
                </div>

                <div className="mkd-table">
                    <TableMain/>
                </div>
            </div>
        </div>
    );
}

export default Main;