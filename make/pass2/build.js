"use strict";

const { introduce, build, gc, merge } = require("megaminx");
const italize = require("../common/italize");

module.exports = async function makeFont(ctx, config, argv) {
	const a = await ctx.run(introduce, "a", {
		from: argv.main,
		prefix: "a"
	});
	const b = await ctx.run(introduce, "b", {
		from: argv.kanji,
		prefix: "b"
	});

	// italize
	if (argv.italize) italize(b, 10);

	await ctx.run(merge.below, "a", "a", "b", { mergeOTL: true });
	await ctx.run(gc, "a");

	await ctx.run(build, "a", { to: argv.o, optimize: true });
};
