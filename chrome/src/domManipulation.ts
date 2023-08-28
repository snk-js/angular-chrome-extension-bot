type Criteria = {
    tagName?: string;
    className?: string;
    parentClassName?: string;
};

let selectedElements: HTMLElement[] = [];
let predictedElements: HTMLElement[] = [];
let savedElements: HTMLElement[] = [];

export const getSavedElements = () => {
    return selectedElements.concat(predictedElements);
};

export const applyInputToAllElements = (input: string) => {
    savedElements.forEach((element) => {
        if (element.tagName === "INPUT") {
            element.setAttribute("value", input);
        } else {
            element.innerText = input;
        }
    });

    removeElements(true);
};

export const styleSavedElements = () => {
    const savedEls = getSavedElements();
    savedElements = savedEls;
    savedElements.forEach((element) => {
        element.classList.remove("selected-element");
        element.classList.remove("predicted-element");
        element.classList.add("saved-element");
    });
};

export const applyClickOnSavedElements = () => {
    savedElements.forEach((element) => {
        element.click();
    });
};

function isValidComparison(firstElement: HTMLElement, secondElement: HTMLElement) {
    const excludedClasses = ["selected-element", "predicted-element", "mouse-over-element"];
    const firstElementClassList = Array.from(firstElement.classList).filter(
        (className) => !excludedClasses.includes(className)
    );
    const secondElementClassList = Array.from(secondElement.classList).filter(
        (className) => !excludedClasses.includes(className)
    );

    if (firstElementClassList.length !== secondElementClassList.length) {
        return false;
    }

    return firstElementClassList.every((className) => secondElementClassList.includes(className));
}

export function addElement(element: HTMLElement, isPredicted: boolean = false) {
    if (predictedElements.length > 0 && !isPredicted) {
        console.log("Predicted elements exist. Cancelling prediction.");
        removeElements();
    }

    if (isPredicted) {
        element.classList.add("predicted-element");
        predictedElements.push(element);
        return;
    }

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
        if (predictedElements.length > 0) {
            removeElements();
        }
        predictElements(selectedElements);
    }
}

export function addPredictedElement(element: HTMLElement) {
    element.classList.add("predicted-element");
    predictedElements.push(element);
}
export function predictElements([firstElement, secondElement]: HTMLElement[]) {
    const commonCriteria: Criteria = {};

    predictedElements.forEach((el) => el.classList.remove("predicted-element"));
    predictedElements = [];

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

    if (
        firstElement.parentElement &&
        secondElement.parentElement &&
        firstElement.parentElement.className === secondElement.parentElement.className
    ) {
        commonCriteria.parentClassName = firstElement.parentElement.className;
    }

    const firstElementDataAttrs = Array.from(firstElement.attributes).filter((attr) =>
        attr.name.startsWith("data-")
    );
    const secondElementDataAttrs = Array.from(secondElement.attributes).filter((attr) =>
        attr.name.startsWith("data-")
    );

    const commonDataAttributes = firstElementDataAttrs.filter((attr) => {
        return secondElementDataAttrs.some(
            (secondAttr) => secondAttr.name === attr.name && secondAttr.value === attr.value
        );
    });

    let elementsToSearch: HTMLElement[] = [];

    if (
        firstElement.parentElement &&
        secondElement.parentElement &&
        firstElement.parentElement === secondElement.parentElement
    ) {
        elementsToSearch = Array.from(firstElement.parentElement.children) as HTMLElement[];
    } else {
        elementsToSearch = Array.from(
            document.querySelectorAll(commonCriteria.tagName)
        ) as HTMLElement[];
    }

    const matchingElements = elementsToSearch.filter((element) => {
        if (selectedElements.includes(element)) {
            return false;
        }

        if (commonCriteria.tagName && element.tagName !== commonCriteria.tagName) {
            return false;
        }

        if (commonCriteria.className && element.className !== commonCriteria.className) {
            return false;
        }

        if (
            commonCriteria.parentClassName &&
            (!element.parentElement ||
                element.parentElement.className !== commonCriteria.parentClassName)
        ) {
            return false;
        }

        if (
            element.children.length !== firstElement.children.length ||
            element.children.length !== secondElement.children.length
        ) {
            return false;
        }

        if (
            (element.parentElement &&
                firstElement.parentElement &&
                secondElement.parentElement &&
                element.parentElement.children.length !==
                    firstElement.parentElement.children.length) ||
            element?.parentElement?.children.length !==
                secondElement?.parentElement?.children.length
        ) {
            return false;
        }

        if (commonDataAttributes.length > 0) {
            if (
                !commonDataAttributes.every(
                    (attr) => element.getAttribute(attr.name) === attr.value
                )
            ) {
                return false;
            }
        }

        if (firstElement.classList.value !== secondElement.classList.value) {
            return (
                isValidComparison(firstElement, element) &&
                isValidComparison(secondElement, element)
            );
        }

        return true;
    });

    if (matchingElements.length === 0) {
        console.log("No elements found matching the pattern. Cancelling prediction.");
        removeElements();
        return;
    }

    for (const element of matchingElements) {
        addElement(element, true);
    }
}

export function removeElements(saved?: boolean) {
    selectedElements.forEach((element) => {
        element.classList.remove("selected-element");
    });
    predictedElements.forEach((element) => {
        element.classList.remove("predicted-element");
    });

    if (saved) {
        savedElements.forEach((element) => {
            element.classList.remove("saved-element");
        });

        savedElements = [];
    }

    selectedElements = [];
    predictedElements = [];
}

export function mouseOverElement(element: HTMLElement) {
    element.classList.add("mouse-over-element");
}

export function mouseOutElement(element: HTMLElement) {
    element.classList.remove("mouse-over-element");
}
