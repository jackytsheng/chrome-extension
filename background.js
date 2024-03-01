chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === "printAllTabs") {
		chrome.tabs.query({}, (tabs) => {
			for (let tab of tabs) {
				chrome.scripting.executeScript({
					target: { tabId: tab.id },
					function: printTab
				});
			}
		});
		sendResponse({ status: "Printing initiated" });
	}
});

function printTab() {
	window.print();
}
