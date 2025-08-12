import { readFileSync } from "node:fs";
import { context, transform } from "esbuild";
import { minify } from "html-minifier";

const packageJson = JSON.parse(readFileSync("./package.json", "utf8"));

async function build() {
	const isWatch = process.argv.includes("--watch");
	const isMinify = process.argv.includes("--minify");

	const ctx = await context({
		entryPoints: ["./src/entry.ts"],
		bundle: true,
		outfile: "dist/sienna.min.js",
		format: "iife",
		minify: isMinify,
		alias: {
			"@": "./src",
		},
		loader: {
			".html": "text",
			".svg": "text",
		},
		plugins: [
			{
				name: "CSSMinifyPlugin",
				setup(build) {
					build.onLoad({ filter: /\.css$/ }, async (args) => {
						const file = readFileSync(args.path, "utf8");
						const css = await transform(file, {
							loader: "css",
							minify: true,
						});
						return { loader: "text", contents: css.code };
					});
				},
			},
			{
				name: "HTMLMinifyPlugin",
				setup(build) {
					build.onLoad({ filter: /\.(html|svg)$/ }, async (args) => {
						const file = readFileSync(args.path, "utf8");
						var html = minify(file, {
							removeComments: true,
							removeEmptyAttributes: true,
							collapseWhitespace: true,
						}).trim();

						return { loader: "text", contents: html };
					});
				},
			},
		],
		banner: {
			js: `/*!
      * Sienna Accessibility Widget v${packageJson.version}
      * (c) ${new Date().getFullYear()} ${packageJson.author}
      * License: ${packageJson.license}
      * Home Page: ${packageJson.homepage}
      * Repository: ${packageJson.repository.url}
      */`,
		},
	});

	if (isWatch) {
		await ctx.watch();
		console.log("⚡ Watching for changes...");
	} else {
		await ctx.rebuild();
		console.log("✅ Build complete!");
		await ctx.dispose();
	}
}

build().catch(() => process.exit(1));
