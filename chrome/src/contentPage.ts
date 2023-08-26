let lastModifiedElement: HTMLElement | null = null;

let selectedElements: HTMLElement[] = [];

let originalStyles: { outline?: string }[] = [];

const clickHandler = function (e: MouseEvent) {
    const element = e.target as HTMLElement | null;
    if (element) {
        addElement(element);
    }
};

const addElement = (element: HTMLElement) => {
    // Store original state
    const originalOutline = element.style.outline;

    // Modify the appearance
    element.style.outline = "2px solid green";

    // Store it for later
    originalStyles.push({ outline: originalOutline });
    selectedElements.push(element);
};

const removeElements = () => {
    for (let i = 0; i < selectedElements.length; i++) {
        const element = selectedElements[i];
        const originalStyle = originalStyles[i];

        // Revert to original state
        if (originalStyle && originalStyle.outline) {
            element.style.outline = originalStyle.outline;
        }
    }

    // Clear arrays
    selectedElements = [];
    originalStyles = [];
};

chrome.runtime.onMessage.addListener((request, sender, respond) => {
    const handler = new Promise((resolve, reject) => {
        if (request) {
            window.addEventListener("message", function (event) {
                if (event.origin !== `chrome-extension://${chrome.runtime.id}`) return;

                console.log({ event });
                if (event.data.type === "enableSelecting") {
                    console.log("selectedElements", selectedElements);
                    document.body.addEventListener("click", clickHandler);
                }

                if (event.data.type === "disableSelecting") {
                    console.log("removed");
                    removeElements();
                    document.body.removeEventListener("click", clickHandler); // Remove click event listener
                }

                if (event.data.type === "attachEventListener") {
                    document.body.addEventListener("mouseover", function (e) {
                        const element = e.target;

                        // Make sure it's an HTMLElement
                        if (element instanceof HTMLElement) {
                            if (lastModifiedElement) {
                                lastModifiedElement.style.outline = "";
                            }

                            e.stopPropagation();
                            e.preventDefault();

                            element.style.outline = "2px solid pink";
                            lastModifiedElement = element;
                        }
                    });
                }
            });
            const currentFrame = document.getElementById("automation-iframe");
            currentFrame && currentFrame.remove();

            const panel = document.querySelector(".automation-panel");
            panel && (panel.innerHTML = "");

            // Create a new container for the iframe
            const containerDiv = document.createElement("div");
            containerDiv.style.width = "-webkit-fill-available";
            containerDiv.style.position = "fixed";
            containerDiv.style.bottom = "-20px";
            containerDiv.style.left = "50%";
            containerDiv.style.transform = "translateX(-50%)";
            containerDiv.style.borderTopLeftRadius = "10px";
            containerDiv.style.borderTopRightRadius = "10px";
            containerDiv.style.zIndex = "9999";

            const iframeSrc = chrome.runtime.getURL("index.html");

            const iframe = document.createElement("iframe");
            iframe.id = "automation-iframe";
            iframe.src = iframeSrc;
            iframe.width = "100%";
            iframe.height = "100%";
            iframe.height = "300px";

            containerDiv.appendChild(iframe);

            document.body.appendChild(containerDiv);

            resolve("Iframe added to the page.");
        } else {
            reject("request is empty.");
        }
    });

    handler.then((message) => respond(message)).catch((error) => respond(error));

    return true;
});
