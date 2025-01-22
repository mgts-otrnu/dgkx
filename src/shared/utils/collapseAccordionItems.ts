function collapseAccordionItems(currentButton: Element): void {
    const accordionButtons: NodeListOf<Element> = document.querySelectorAll('.accordion-button');
    const accordionCollapseItems: NodeListOf<Element> = document.querySelectorAll('.accordion-collapse');

    if (accordionButtons) {
        accordionButtons.forEach(button => {
            if (button !== currentButton && !button.classList.contains("mkd-items__button")) {
                button.classList.add("collapsed");
            }
        });
    }

    if (accordionCollapseItems) {
        accordionCollapseItems.forEach(element => {
            if ( !element.classList.contains("mkd-items__collapse")) {
               element.classList.remove("show");
            }
        });
    }
}

export default collapseAccordionItems;