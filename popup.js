const onInit = async () => {
	let queryOptions = { active: true, currentWindow: true };
	let [currentTab] = await chrome.tabs.query(queryOptions);
	await chrome.tabs.sendMessage(
		currentTab.id,
		{ selector: '[data-testid="issue.issue-view.views.common.issue-line-card.issue-line-card-view.key"]' },
		({ urls }) => {
			try {
				const container = document.getElementById('links-container');
				const list = document.createElement('ul');
				const countElement = document.createElement('p');

				// Display the count of URLs
				countElement.textContent = `Total URLs: ${urls.length}`;
				container.appendChild(countElement);

				container.appendChild(list);

				// Create and append <a> tags within <li> tags for each URL
				urls.forEach((url, index) => {
					const listItem = document.createElement('li');
					const link = document.createElement('a');
					link.href = url;
					link.textContent = url; // Or any other text you want for the link
					link.id = `link-${index}`; // Assign a unique ID to each link
					listItem.appendChild(link);
					list.appendChild(listItem);
				});

			} catch (e) {
				console.log(e)
			}

		}
	);
};

onInit()
