#!/usr/bin/env node

import { existsSync } from "fs";



class Fjord {
	constructor () {}
}


function doStuff (args: string[]) {
	const fj = new Fjord();
	console.log(`Created new Fjord . . .`);

	for (const arg of args) {
		if (existsSync(arg)) {
			console.log(`Found: ${arg}`);
		} else {
			const command = arg.toUpperCase();
			switch (command) {
				case 'MIN':
					console.log(`\tLets minify this!`); break;
				case 'S1': case '1S': case 'S':
					console.log(`\tLets use 1 space!`); break;
				case 'S2': case '2S': case 'SS':
					console.log(`\tLets use 2 spaces!`); break;
				case 'S4': case '4S': case 'SSSS':
					console.log(`\tLets use 4 spaces!`); break;
				case 'TAB': case 'TABS': case 'T':
					console.log(`\tLets use tabs!`); break;
				default:
					console.log(`\tUnknown command or file: '${arg}'`);
			}
		}
	}
}


function main () {
	const args = process.argv.slice(2);
	if (args.length === 0) {
		console.log(`No args supplied!`);
	} else {
		doStuff(args);
	}
}

main();
