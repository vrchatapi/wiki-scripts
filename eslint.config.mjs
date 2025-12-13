import { configure } from "@ariesclark/eslint-config";

export default configure({
	react: false,
	tailwind: false,
	formatters: {
		css: true
	}
});
