import successIcon from "../../../assets/images/icons/alert/success.svg";
import failIcon from "../../../assets/images/icons/alert/fail.svg";

import "./AlertCustom.scss";

function AlertCustom({type, text}: { type: "success" | "fail", text: string }) {
    return (
        <div className="alertCustom">
            <div className="alertCustom_image">
                <img src={type === "success" ? successIcon : failIcon} alt="Иконка статуса"/>
            </div>
            <p className="alertCustom_text m-0">{text}</p>
        </div>
    );
}

export default AlertCustom;