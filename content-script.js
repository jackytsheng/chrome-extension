chrome.runtime.onMessage.addListener(async (request, _, sendResponse) => {
	try {
		const { selector } = request;
		console.log("loading downloadable urls")
		const sections = Array.from(document.querySelectorAll(selector));
		const urls = sections.map((s) => `https://xero.atlassian.net/si/jira.issueviews:issue-word/${s.innerText}/${s.innerText}.doc`)
		await sendResponse({ urls: urls });
	} catch (e) {

		// do nothing
	}
});
