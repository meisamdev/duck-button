import * as vscode from "vscode";
const cp = require('child_process');

let statusBarItem: vscode.StatusBarItem;
const commandId = "duck-button.play";

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "duck-button" is now active!');

	const quack = `${context.extensionPath}/resources/quack.mp3`;

	let disposable = vscode.commands.registerCommand(commandId, () => {
		vscode.window.showInformationMessage('Quack!');
		cp.exec(`ffplay "${quack}" -autoexit -nodisp`);
	});

	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.command = commandId;
	statusBarItem.text = "$(icon-duck-sound)";
	statusBarItem.show();
	context.subscriptions.push(statusBarItem);

	context.subscriptions.push(disposable);
}

export function deactivate() {
	statusBarItem.hide();
}
