# Extension Manifest Editor


This extension lets you preview the details page for your extension from within Visual Studio Code. Use it to add rich content to your manifest and readme files and see how your extension will appear on the Marketplace. Features include:

- Side by Side Preview
- Standalone Preview
- Live Editing 

### Side Preview with Live Editing
![IDE](Side_Preview.gif)

### Standalone Preview
![IDE](Standalone_Preview.gif)

## Usage
- Open extension project from the root folder in vscode.
- Navigate to the manifest file for your extension (`package.json` for Visual Studio Code extensions and `vss-extension.json` for Team Services extensions).
   - For side by side preview, either use the keybinding `ctrl+q y` or Press `F1`, type `Extension Manifest: Open Manifest Preview to the Side` and hit return
   - For standalone preview, either use the keybinding `ctrl+shift+y` or Press `F1`, type `Extension Manifest: Open Manifest Preview` and hit return

