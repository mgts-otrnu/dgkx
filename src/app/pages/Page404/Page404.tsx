import {NavigateFunction, useNavigate} from "react-router-dom";

function Page404() {
    const navigate: NavigateFunction = useNavigate();

    return (
        <div className="page-404">
            <h3 className="page-404__title">404</h3>
            <p className="page-404__text">Страница не найдена</p>
            <button
                type="button"
                className="page-404__button"
                onClick={() => navigate(-1)}
            >
                Назад
            </button>
        </div>
    );
}

export default Page404;
