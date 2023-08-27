import {
    attachClickHandler,
    removeClickHandler,
    attachMouseOverHandler,
    removeMouseOverHandler,
} from "./eventHandlers";
import { injectIframe } from "./iframe";
import { removeElements } from "./domManipulation";

let i = 0;

const injectCss = () => {
    const link = document.createElement("link");
    link.href = chrome.runtime.getURL("contentStyle.css");
    link.type = "text/css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
};

chrome.runtime.onMessage.addListener((request, sender, respond) => {
    const handler = new Promise((resolve, reject) => {
        if (request) {
            if (i === 0) {
                injectIframe();
                injectCss();
            }
            window.addEventListener("message", (event) => {
                if (!event.origin.includes(chrome.runtime.id)) return;

                if (event.data.type === "enableSelecting") {
                    attachClickHandler();
                }
                if (event.data.type === "disableSelecting") {
                    removeClickHandler();
                    removeElements();
                }
                if (event.data.type === "attachEventListener") {
                    attachMouseOverHandler();
                }
            });

            resolve(`event.data type is not supported.`);
        } else {
            reject("Request is empty.");
        }
    });

    handler
        .then((message) => {
            respond({ status: "success", message });
        })
        .catch((error) => {
            respond({ status: "error", message: error });
        });

    i++;
    return true;
});
