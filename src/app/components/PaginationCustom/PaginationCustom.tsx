import {useEffect, useState} from "react";

import "./PaginationCustom.scss";

interface Props {
    paginationItems: any[];
    type: "sm" | "full";
    itemsPerPageInitial: 10 | 15 | 25 | 50;
}

function PaginationCustom({paginationItems, type, itemsPerPageInitial}: Props) {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [itemsPerPage, setItemsPerPage] = useState<number>(itemsPerPageInitial);
    const [startPage, setStartPage] = useState<number>(0);
    const [endPage, setEndPage] = useState<number>(0);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    const itemsPerPageList = [
        {value: 0, count: 10},
        {value: 1, count: 25},
        {value: 2, count: 50}
    ]

    function showPage(page: number, itemsPerPageCurrent: number): void {
        const startPageCount: number = page * itemsPerPageCurrent;
        const endPageCount: number = startPageCount + itemsPerPageCurrent;

        setStartPage(startPageCount);
        setEndPage(endPageCount);

        const inputElement: HTMLElement | null = document.getElementById("pagination-input");
        (inputElement as HTMLInputElement).value = `${page + 1}`;

        paginationItems && paginationItems.forEach((item: HTMLTableRowElement, index: number): void => {
            item.classList.toggle('d-none', index < startPageCount || index >= endPageCount);
        });
    }

    function handlePrevButtonClick(): void {
        const currentPageNew: number = currentPage - 1;
        if (currentPageNew >= 0) {
            setCurrentPage(currentPageNew);
            showPage(currentPageNew, itemsPerPage);
        }
    }

    function handleNextButtonClick(): void {
        const currentPageNew: number = currentPage + 1;
        if (currentPageNew < totalPages) {
            setCurrentPage(currentPageNew);
            showPage(currentPageNew, itemsPerPage);
        }
    }

    function onInputChange(event: any): void {
        const value = event.target.value;

        if (value > 0 && value <= totalPages) {
            setCurrentPage(event.target.value - 1);
            showPage(event.target.value - 1, itemsPerPage);
        }
    }

    function onItemsCountChange(event: any) {
        const optionValue = itemsPerPageList.find(item => item.value === parseInt(event.target.value));
        if (optionValue) {
            setItemsPerPage(optionValue.count);
            showPage(currentPage, optionValue.count);
        }
    }

    useEffect(() => {
        if (paginationItems) {
            const totalItemsCount: number = paginationItems && paginationItems.length;
            const totalPagesCount: number = totalItemsCount && Math.ceil(totalItemsCount / itemsPerPage);

            setTotalItems(totalItemsCount);
            setTotalPages(totalPagesCount);

            showPage(0, itemsPerPage);
        }
    }, [paginationItems]);

    return (
        <div className="pagination">
            {type === "full" &&
                <div className="pagination__items-count">
                    Строк на странице
                    <select className="form-select select-default ms-2 me-4"
                            id="items-count"
                            aria-label="Строк на странице"
                            onChange={onItemsCountChange}>
                        {itemsPerPageList.map((item: any, index: number) => (
                            <option key={index} value={index}>{item.count}</option>
                        ))}
                    </select>
                </div>
            }
            <div className="pagination__pages-of">
                {startPage + 1}-{endPage <= totalItems ? endPage : totalItems} / {totalItems}
            </div>
            <button className="pagination__button pagination__button_prev" onClick={handlePrevButtonClick}></button>
            <div className="pagination__info">Страница
                <input className="pagination__input"
                       id="pagination-input"
                       type="text"
                       defaultValue={currentPage + 1}
                       onChange={onInputChange}/>
                из {totalPages}
            </div>
            <button className="pagination__button pagination__button_next" onClick={handleNextButtonClick}></button>
        </div>
    )
}

export default PaginationCustom;