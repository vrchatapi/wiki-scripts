import { defineConfig } from "vite";

export default defineConfig({
	resolve: {
		tsconfigPaths: true
	},
	build: {
		target: "es2015",
		assetsDir: "",
		modulePreload: false,
		minify: false,
		rolldownOptions: {
			input: {
				"MediaWiki:Common": "./src",
				"MediaWiki:Timeless": "./src/themes/timeless/index.css",
			},
			output: {
				format: "cjs",
				inlineDynamicImports: true,
				minify: {
					compress: {
						sequences: false,
						joinVars: false,
					},
					codegen: {
						removeWhitespace: false
					},
					mangle: {
						keepNames: true
					}
				},
				sanitizeFileName: false,
				entryFileNames: "[name].js",
				assetFileNames: "[name].[ext]",
				// MediaWiki doesn't isolate scripts, every declared variable is global.
				// https://developer.mozilla.org/en-US/docs/Glossary/IIFE
				intro: "(()=>{",
				outro: "})()"
			}
		}
	},
	experimental: {
		// We bundle fonts, but haven't uploaded them yet.
		renderBuiltUrl: (filename) => {
			if (filename.startsWith("exo-2"))
				return `https://cdn.jsdelivr.net/npm/@fontsource-variable/exo-2/files/${filename}`;

			if (filename.startsWith("noto-sans"))
				return `https://cdn.jsdelivr.net/npm/@fontsource-variable/noto-sans/files/${filename}`;
		}
	}
});
