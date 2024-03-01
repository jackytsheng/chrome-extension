document.getElementById('printButton').addEventListener('click', function () {
	chrome.runtime.sendMessage({ action: "printAllTabs" }, function (response) {
		console.log('All tabs printing initiated');
	});
});

const onInit = async () => {
	let queryOptions = { active: true, currentWindow: true };
	let [currentTab] = await chrome.tabs.query(queryOptions);
	await chrome.tabs.sendMessage(
		currentTab.id,
		{ selector: '[data-testid="issue.issue-view.views.common.issue-line-card.issue-line-card-view.key"]' },
		({ docsUrls, htmlUrls }) => {
			console.log("print", htmlUrls, docsUrls)
			try {
				const container = document.getElementById('links-container');
				const docsUrlHeader = document.createElement('h2');
				const htmlUrlHeader = document.createElement('h2');
				const list = document.createElement('ul');
				const list2 = document.createElement('ul');
				const countElement = document.createElement('p');

				// Display the count of URLs
				countElement.textContent = `Total URLs: ${docsUrls.length}`;
				container.appendChild(countElement);
				docsUrlHeader.textContent = "Doc Urls:"
				htmlUrlHeader.textContent = "Html Urls:"
				container.appendChild(docsUrlHeader);
				container.appendChild(list);

				// Create and append <a> tags within <li> tags for each URL
				docsUrls.forEach((url, index) => {
					const listItem = document.createElement('li');
					const link = document.createElement('a');
					link.href = url;
					link.textContent = url; // Or any other text you want for the link
					link.id = `docs-link-${index}`; // Assign a unique ID to each link
					listItem.appendChild(link);
					list.appendChild(listItem);
				});
				container.appendChild(htmlUrlHeader);
				container.appendChild(list2);

				// Create and append <a> tags within <li> tags for each URL
				htmlUrls.forEach((url, index) => {
					const listItem = document.createElement('li');
					const link = document.createElement('a');
					link.href = url;
					link.textContent = url; // Or any other text you want for the link
					link.id = `html-link-${index}`; // Assign a unique ID to each link
					listItem.appendChild(link);
					list2.appendChild(listItem);
				});

			} catch (e) {
				console.log(e)
			}

		}
	);
};

onInit()
