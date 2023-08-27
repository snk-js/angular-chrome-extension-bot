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
    // Wrap the logic inside a new Promise
    const handler = new Promise((resolve, reject) => {
        if (request) {
            console.log(request, "request");

            if (i === 0) {
                injectIframe();
                injectCss();
            }
            window.addEventListener("message", (event) => {
                console.log(event.data, "event");

                // Switch or if-else logic here to handle different types of requests
                if (event.data.type === "enableSelecting") {
                    attachClickHandler();
                }
                if (event.data.type === "disableSelecting") {
                    removeClickHandler();
                    removeElements();
                }
                if (event.data.type === "attachEventListener") {
                    console.log("lol");

                    attachMouseOverHandler();
                }
            });

            resolve(`event.data type is not supported.`);
        } else {
            // If there is an error, reject the promise
            reject("Request is empty.");
        }
    });

    // Use then() and catch() to send the response
    handler
        .then((message) => {
            console.log("sending response", { message });

            respond({ status: "success", message });
        })
        .catch((error) => {
            respond({ status: "error", message: error });
        });

    // Indicate that the response function will be called asynchronously
    i++;
    return true;
});
