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
    console.log({ request });
    // Wrap the logic inside a new Promise
    const handler = new Promise((resolve, reject) => {
        if (request) {
            if (i === 0) {
                injectIframe();
                injectCss();
                resolve("Iframe added to the page.");
            }

            // Switch or if-else logic here to handle different types of requests
            if (request.type === "enableSelecting") {
                attachClickHandler();
                resolve("enabling selecting");
            }
            if (request.type === "disableSelecting") {
                removeClickHandler();
                removeElements();
                resolve("disabling selecting");
            }
            if (request.type === "attachEventListener") {
                attachMouseOverHandler();
                resolve("attaching event listener");
            }

            resolve(`Request type ${request.type} is not supported.`);
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
