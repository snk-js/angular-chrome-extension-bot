chrome.runtime.onMessage.addListener((request, sender, respond) => {
    const handler = new Promise((resolve, reject) => {
        if (request) {
            const contentElement = document.querySelector(".automation-content");
            if (contentElement) {
                // Get the URL of your Angular app's index.html from your extension's files
                const iframeSrc = chrome.runtime.getURL("index.html");

                // Create an iframe element
                const iframe = document.createElement("iframe");
                iframe.src = iframeSrc;
                iframe.width = "100%"; // or your desired width
                iframe.height = "100%"; // or your desired height

                // Append the iframe to the contentElement
                contentElement.innerHTML = "";
                contentElement.appendChild(iframe);

                resolve("Iframe added to the page.");
            } else {
                reject("Content element not found.");
            }
        } else {
            reject("request is empty.");
        }
    });

    handler.then((message) => respond(message)).catch((error) => respond(error));

    return true;
});
