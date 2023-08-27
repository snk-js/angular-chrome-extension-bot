type Criteria = {
    tagName?: string;
    className?: string;
};

let selectedElements: HTMLElement[] = [];
let predictedElements: HTMLElement[] = [];

export function addElement(element: HTMLElement) {
    if (selectedElements.length > 2) {
        console.log("Too many elements selected. Cancelling prediction.");
        removeElements();
        return;
    }

    if (selectedElements.includes(element)) {
        console.log("Element already selected");
        return;
    }

    element.classList.add("selected-element");
    selectedElements.push(element);
    if (selectedElements.length === 2) {
        predictElements(selectedElements);
    }
}

export function addPredictedElement(element: HTMLElement) {
    element.classList.add("predicted-element");
    predictedElements.push(element);
}
export function predictElements([firstElement, secondElement]: HTMLElement[]) {
    const commonCriteria: Criteria = {};

    if (
        !firstElement.parentElement ||
        !secondElement.parentElement ||
        firstElement.parentElement !== secondElement.parentElement
    ) {
        console.log("Elements are not siblings. Cancelling prediction.");
        removeElements();
        return;
    }

    if (firstElement.tagName === secondElement.tagName) {
        commonCriteria.tagName = firstElement.tagName;
    } else {
        console.log("Elements do not have the same tag. Cancelling prediction.");
        removeElements();
        return;
    }

    if (firstElement.className === secondElement.className) {
        commonCriteria.className = firstElement.className;
    }

    const siblingElements = Array.from(firstElement.parentElement.children) as HTMLElement[];

    const matchingElements = siblingElements.filter((element) => {
        if (commonCriteria.tagName && element.tagName !== commonCriteria.tagName) return false;
        if (commonCriteria.className && element.className !== commonCriteria.className)
            return false;
        return true;
    });

    if (matchingElements.length === 0) {
        console.log("No elements found matching the pattern. Cancelling prediction.");
        removeElements();
        return;
    }

    for (const element of matchingElements) {
        addPredictedElement(element);
    }
}

export function removeElements() {
    selectedElements.forEach((element) => {
        element.classList.remove("selected-element");
    });
    predictedElements.forEach((element) => {
        element.classList.remove("predicted-element");
    });
    selectedElements = [];
    predictedElements = [];
}

export function mouseOverElement(element: HTMLElement) {
    element.classList.add("mouse-over-element");
}

export function mouseOutElement(element: HTMLElement) {
    element.classList.remove("mouse-over-element");
}
