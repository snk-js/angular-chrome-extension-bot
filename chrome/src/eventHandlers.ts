import { mouseOverElement, mouseOutElement, addElement } from "./domManipulation";

export function attachClickHandler() {
    document.body.addEventListener("click", clickHandler);
}

export function removeClickHandler() {
    document.body.removeEventListener("click", clickHandler);
}

function clickHandler(e) {
    const element = e.target;
    if (element) {
        addElement(element);
    }
}

function mouseOutHandler(e) {
    console.log("mouseOutHandler");

    const element = e.target;
    if (element) {
        mouseOutElement(element);
    }
}

export function attachMouseOverHandler() {
    document.body.addEventListener("mouseover", mouseOverHandler);
    document.body.addEventListener("mouseout", mouseOutHandler);
}

export function removeMouseOverHandler() {
    document.body.removeEventListener("mouseover", mouseOverHandler);
    document.body.removeEventListener("mouseout", mouseOutHandler);
}

function mouseOverHandler(e) {
    const element = e.target;
    if (element) {
        mouseOverElement(element);
    }
}
