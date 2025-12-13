// todo: https://www.mediawiki.org/wiki/Extension:YouTube

document.querySelectorAll<HTMLElement>(".youtube").forEach((element) => {
	const { videoId, ...attributes } = element.dataset;

	const iframe = document.createElement("iframe");

	iframe.setAttribute("width", String(560));
	iframe.setAttribute("height", String(315));
	iframe.setAttribute("frameborder", String(0));
	iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
	iframe.setAttribute("allowfullscreen", String(true));

	// As suggested by YouTube's embed copy.
	iframe.setAttribute(
		"allow",
		[
			"accelerometer",
			"autoplay",
			"clipboard-write",
			"encrypted-media",
			"gyroscope",
			"picture-in-picture",
			"web-share"
		].join("; ")
	);

	for (const key in attributes) {
		const value = attributes[key];
		if (!value) continue;

		iframe.setAttribute(key, value);
	}

	iframe.setAttribute("style", element.getAttribute("style") || "");
	iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;

	element.replaceWith(iframe);
});
