#!/usr/bin/env node

import { existsSync, readFileSync } from "fs";



class Fjord {
	tabs: boolean = false;
	spaces: number = 4;

	constructor () {}

	format (inputJsonPath: string) {
		console.log(`Formatting: ${inputJsonPath}`);
		const inputJsonText = readFileSync(inputJsonPath, 'utf8');
		try {
			const jo = JSON.parse(inputJsonText);
			// console.log(jo);
			const outputJsonText = JSON.stringify(jo, null, this.getIndentation());
			console.log(outputJsonText);
		} catch (error) {
			console.log(`\tError: ${error}`);
			console.log(`\tCould not parse: '${inputJsonPath}'`);
		}
	}

	getIndentation () {
		return this.tabs ? '\t' : this.spaces;
	}

	useTabs () { this.tabs = true; }
	useSpaces (spaces: number) {
		this.tabs = false;
		this.spaces = spaces;
	}
}


function doStuff (args: string[]) {
	const fj = new Fjord();
	console.log(`Created new Fjord . . .`);

	for (const arg of args) {
		if (existsSync(arg)) {
			// console.log(`Found: ${arg}`);
			fj.format(arg);
		} else {
			const command = arg.toUpperCase();
			switch (command) {
				case 'MIN':
					console.log(`\tLets minify this!`); break;
				case 'S1': case '1S': case 'S':
					console.log(`\tLets use 1 space!`); fj.useSpaces(1); break;
				case 'S2': case '2S': case 'SS':
					console.log(`\tLets use 2 spaces!`); fj.useSpaces(2); break;
				case 'S4': case '4S': case 'SSSS':
					console.log(`\tLets use 4 spaces!`); fj.useSpaces(4); break;
				case 'TAB': case 'TABS': case 'T':
					console.log(`\tLets use tabs!`); fj.useTabs(); break;

				case 'FJ':
				case 'ASK':
				case 'REPLACE':
				case 'PRINT':
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
