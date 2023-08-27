export function injectIframe() {
    // Remove existing iframe if there is one
    const existingIframe = document.getElementById("automation-iframe");
    if (existingIframe) existingIframe.remove();

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

    // Create the iframe
    const iframeSrc = chrome.runtime.getURL("index.html");
    const iframe = document.createElement("iframe");
    iframe.id = "automation-iframe";
    iframe.src = iframeSrc;
    iframe.width = "100%";
    iframe.height = "300px";
    // Attach the iframe to the container
    containerDiv.appendChild(iframe);

    // Attach the container to the document body
    document.body.appendChild(containerDiv);
}
