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
	endNewLine: boolean = false;
	outputMode: OutputModeDS = 'PRINT';

	constructor () {}

	getIndentation () {
		return this.tabs ? '\t' : this.spaces;
	}

	useTabs () {
		this.tabs = true;
		print(`\tLets use tabs!`);
	}
	useSpaces (spaces: number) {
		this.tabs = false;
		this.spaces = spaces;
		if (this.spaces === 0) {
			print(`\tLets minify this!`);
		} else {
			print(`\tLets use ${this.spaces} spaces!`);
		}
	}
	useEndNewLine (v: boolean = true) { this.endNewLine = v; }

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

	toJson (jo: any) {
		const outputJsonText = JSON.stringify(jo, null, this.getIndentation());
		return this.endNewLine ? outputJsonText + '\n' : outputJsonText;
	}

	produceOutput (jo: any, inputJsonPath: string) {
		const outputJsonText = this.toJson(jo);

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
	print(`Created new Fjord . . .`);

	for (const arg of args) {
		if (existsSync(arg)) {
			// print(`Found: ${arg}`);
			fj.format(arg);
		} else {
			const command = arg.toUpperCase();
			switch (command) {
				case 'MIN': fj.useSpaces(0); break;
				case 'S1': case '1S': case 'S': fj.useSpaces(1); break;
				case 'S2': case '2S': case 'SS': fj.useSpaces(2); break;
				case 'S4': case '4S': case 'SSSS': fj.useSpaces(4); break;
				case 'TAB': case 'TABS': case 'T': fj.useTabs(); break;

				case 'ENL': fj.useEndNewLine(); break;

				case 'ASK': fj.useAskMode(); break;
				case 'FJ': fj.useFjMode(); break;
				case 'REPLACE': fj.useReplaceMode(); break;
				case 'PRINT': fj.usePrintMode(); break;

				default:
					print(`\tUnknown command or file: '${arg}'`);
			}
		}
	}
}


function main () {
	const args = process.argv.slice(2);
	if (args.length === 0) {
		print(`No args supplied!`);
	} else {
		doStuff(args);
	}
}

main();
