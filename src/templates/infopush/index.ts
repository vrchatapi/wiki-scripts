import { ArticleDialog, getArticleFromElement } from "./article";

import "./infopush.css";

const infopushes = document.querySelectorAll(".tpl-infopush");

const windowManager = new OO.ui.WindowManager();
$(document.body).append(windowManager.$element);

for (const infopush of infopushes) {
	const content = infopush.querySelector<HTMLElement>(".tpl-infopush-content")!;

	const items = content.querySelectorAll<HTMLElement>(".tpl-infopush-item");
	const total = items.length;

	for (const item of items) {
		if (item.querySelector("a")) continue;

		const article = getArticleFromElement(item);
		if (!article) continue;

		item.style.cursor = "pointer";
		item.addEventListener("click", async () => {
			if (!await windowManager.getWindow(article.id).then(() => true).catch(() => false)) {
				const articleDialog = new ArticleDialog(article);
				windowManager.addWindows({ [article.id]: articleDialog });
			}

			await windowManager.openWindow(article.id).opening;
		});
	}

	const navigation = infopush.querySelector(".tpl-infopush-navigation")!;

	let currentOffset = 0;
	function showSlide(index: number) {
		currentOffset = (index + total) % total;
		content.style.transform = `translateX(-${currentOffset * 100}%)`;
	}

	const autoAdvanceEvery = 5000;

	let autoAdvanceInterval: number;
	function resetAutoAdvance() {
		if (autoAdvanceInterval) clearInterval(autoAdvanceInterval);
		autoAdvanceInterval = setInterval(() => {
			showSlide(currentOffset + 1);
		}, autoAdvanceEvery);
	}

	navigation
		.querySelector(".tpl-infopush-navigation-previous")!
		.addEventListener("click", () => {
			showSlide(currentOffset - 1);
			resetAutoAdvance();
		});

	navigation
		.querySelector(".tpl-infopush-navigation-next")!
		.addEventListener("click", () => {
			showSlide(currentOffset + 1);
			resetAutoAdvance();
		});

	resetAutoAdvance();
	showSlide(0);
}
