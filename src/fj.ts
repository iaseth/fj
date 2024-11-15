#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from "fs";
import * as path from "path";



const prompt = require('prompt-sync')();

const print = console.log;

function saveTextToFile (text: string, filePath: string) {
	writeFileSync(filePath, text);
}


type OutputModeDS = 'ASK' | 'FJ' | 'PRINT' | 'REPLACE';


class Fjord {
	tabs: boolean = true;
	spaces: number = 4;
	outputMode: OutputModeDS = 'PRINT';

	constructor () {}

	getIndentation () {
		return this.tabs ? '\t' : this.spaces;
	}

	useTabs () { this.tabs = true; }
	useSpaces (spaces: number) {
		this.tabs = false;
		this.spaces = spaces;
	}

	useAskMode () { this.outputMode = 'ASK'; }
	useFjMode () { this.outputMode = 'FJ'; }
	usePrintMode () { this.outputMode = 'PRINT'; }
	useReplaceMode () { this.outputMode = 'REPLACE'; }

	format (inputJsonPath: string) {
		print(`Formatting: ${inputJsonPath}`);
		const inputJsonText = readFileSync(inputJsonPath, 'utf8');
		try {
			const jo = JSON.parse(inputJsonText);
			this.produceOutput(jo, inputJsonPath);
		} catch (error) {
			print(`\tError: ${error}`);
			print(`\tCould not parse: '${inputJsonPath}'`);
		}
	}

	produceOutput (jo: any, inputJsonPath: string) {
		const outputJsonText = JSON.stringify(jo, null, this.getIndentation());

		switch (this.outputMode) {
			case 'ASK':
				const customOutputJsonPath = prompt('    Where to save: ');
				saveTextToFile(outputJsonText, customOutputJsonPath);
				print(`\tSaved: ${customOutputJsonPath}`)
				break;
			case 'FJ':
				const fjOutputJsonPath = path.format({ ...path.parse(inputJsonPath), base: '', ext: '.fj.json' })
				saveTextToFile(outputJsonText, fjOutputJsonPath);
				print(`\tUpdated: ${fjOutputJsonPath}`)
				break;
			case 'REPLACE':
				saveTextToFile(outputJsonText, inputJsonPath);
				print(`\tReplaced: ${inputJsonPath}`)
				break;
			case 'PRINT':
			default:
				print(outputJsonText);
		}
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

				case 'ASK': fj.useAskMode(); break;
				case 'FJ': fj.useFjMode(); break;
				case 'REPLACE': fj.useReplaceMode(); break;
				case 'PRINT': fj.usePrintMode(); break;

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
