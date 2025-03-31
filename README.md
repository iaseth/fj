
# fj - JSON Formatter CLI  

`fj` is a command-line utility for formatting JSON files with customizable indentation and output options. It allows users to specify indentation styles, choose output modes, and process multiple JSON files efficiently.  

## Features  

- **Indentation Options:** Use tabs or spaces (1, 2, or 4 spaces).  
- **Output Modes:**  
  - **PRINT:** Display formatted JSON in the console (default).  
  - **ASK:** Prompt for a filename to save the formatted JSON.  
  - **FJ:** Save the formatted JSON with a `.fj.json` extension.  
  - **REPLACE:** Overwrite the original file.  
- **End with Newline:** Optionally append a newline character.  
- **Batch Processing:** Format multiple JSON files in one command.  

## Installation  

Install `fj` globally using npm:  

```bash
npm i -g fj-cli
```

## Usage  

Run `fj` from the command line with options and file paths:  

```bash
fj [options] <file1.json> <file2.json> ...
```

### Options  

- **Indentation:**  
  - `MIN`: Minify JSON (no spaces).  
  - `S1` or `1S`: 1-space indentation.  
  - `S2` or `2S`: 2-space indentation.  
  - `S4` or `4S`: 4-space indentation.  
  - `TAB` or `TABS`: Tab indentation.  
- **Output Modes:**  
  - `PRINT`: Print formatted JSON to console.  
  - `ASK`: Prompt for a filename to save.  
  - `FJ`: Save as `<filename>.fj.json`.  
  - `REPLACE`: Overwrite the original file.  
- **Additional:**  
  - `ENL`: Append a newline at the end.  

### Examples  

- Format `data.json` using 2 spaces and print to console:  
  ```bash
  fj S2 data.json
  ```
- Format `data.json` using tabs and save as `data.fj.json`:  
  ```bash
  fj TAB FJ data.json
  ```
- Minify `data.json` and overwrite the original file:  
  ```bash
  fj MIN REPLACE data.json
  ```
- Format multiple files with 4 spaces and append a newline:  
  ```bash
  fj S4 ENL file1.json file2.json
  ```

## License  

This project is licensed under the MIT License.  

For more details, visit [https://github.com/iaseth/fj](https://github.com/iaseth/fj).  
