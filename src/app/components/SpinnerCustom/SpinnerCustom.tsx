import "./SpinnerCustom.scss";

function SpinnerCustom({className}: {className?: string}) {
    return (
        <div className={`spinner-custom ${className ? className : ""}`}>
            <div className="spinner-border text-primary" role="status"></div>
        </div>
    );
}

export default SpinnerCustom;
