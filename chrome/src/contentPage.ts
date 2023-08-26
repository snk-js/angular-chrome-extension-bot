let lastModifiedElement = null;

chrome.runtime.onMessage.addListener((request, sender, respond) => {
    const handler = new Promise((resolve, reject) => {
        if (request) {
            window.addEventListener("message", function (event) {
                if (event.origin !== `chrome-extension://${chrome.runtime.id}`) return;
                if (event.data.type === "attachEventListener") {
                    document.body.addEventListener("mouseover", function (e) {
                        // Remove style from the last modified element, if any
                        if (lastModifiedElement) {
                            lastModifiedElement.style.outline = "";
                        }

                        const element = e.target;

                        e.stopPropagation();
                        e.preventDefault();

                        element && (element.style.outline = "2px solid pink");
                        lastModifiedElement = element;
                    });
                }
            });
            // Remove the iframe if it already exists
            const currentFrame = document.querySelector("automation-iframe");
            currentFrame && currentFrame.remove();

            const panel = document.querySelector(".automation-panel");
            panel && (panel.innerHTML = "");

            // Create a new container for the iframe
            const containerDiv = document.createElement("div");
            containerDiv.style.width = "-webkit-fill-available";
            containerDiv.style.position = "fixed";
            containerDiv.style.bottom = "-50px";
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
