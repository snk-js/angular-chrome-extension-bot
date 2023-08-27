let selectedElements: HTMLElement[] = [];

export function addElement(element: HTMLElement) {
    element.classList.add("selected-element");
    selectedElements.push(element);
}

export function removeElements() {
    selectedElements.forEach((element) => {
        element.classList.remove("selected-element");
    });
    selectedElements = [];
}

export function mouseOverElement(element) {
    console.log(element, "hover");

    element.classList.add("mouse-over-element");
}

export function mouseOutElement(element) {
    element.classList.remove("mouse-over-element");
}
