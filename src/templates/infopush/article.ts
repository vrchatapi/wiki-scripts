interface Article {
	id: string;
	title: string;
	content: string;
}

export function getArticleFromElement(element: HTMLElement): Article | null {
	const { articleId, articleTitle, articleContent } = element.dataset;
	if (!articleId || !articleTitle || !articleContent) return null;

	const content = atob(articleContent);

	return {
		id: articleId,
		title: articleTitle,
		content
	};
}

export class ArticleDialog extends OO.ui.ProcessDialog {
	public constructor(private article: Article) {
		super({
			size: "large",
			data: {
				title: article.title
			}
		});
	}

	public initialize(): this {
		super.initialize();

		const content = new OO.ui.PanelLayout({
			expanded: false,
			padded: true,
			scrollable: true
		});

		content.$element.append(this.article.content);
		// @ts-expect-error: $body exists, but isn't typed.
		this.$body.append(content.$element);

		return this;
	}

	public getActionProcess(action?: string): OO.ui.Process {
		switch (action) {
			case "close":
				return new OO.ui.Process(() => {
					this.close({ action: "close" });
				});
		}

		return super.getActionProcess(action);
	}
}

ArticleDialog.static.name = ArticleDialog.name;
ArticleDialog.static.actions = [
	{
		action: "close",
		flags: "safe",
		icon: "close",
		label: "Close"
	}
];
