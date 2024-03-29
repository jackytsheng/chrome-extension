chrome.runtime.onMessage.addListener(async (request, _, sendResponse) => {
	try {
		const { selector } = request;
		console.log("loading downloadable urls")
		const sections = Array.from(document.querySelectorAll(selector));
		const docsUrls = sections.map((s) => `https://xero.atlassian.net/si/jira.issueviews:issue-word/${s.innerText}/${s.innerText}.doc`)
		const htmlUrls = sections.map((s) => `https://xero.atlassian.net/si/jira.issueviews:issue-html/${s.innerText}/${s.innerText}.html`)
		await sendResponse({ docsUrls: docsUrls, htmlUrls: htmlUrls });
	} catch (e) {

		// do nothing
	}
});
