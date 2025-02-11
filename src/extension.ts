import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.createFeatureStructure', async (uri: vscode.Uri) => {
		// Prompt for feature name
		const featureNameInput = await vscode.window.showInputBox({
			prompt: 'Enter the feature name',
			placeHolder: 'e.g., authentication, user_profile',
			validateInput: (value) => {
				if (!value) {
					return 'Feature name is required';
				}
				if (!/^[a-z0-9_]+$/.test(value)) {
					return 'Feature name can only contain lowercase letters, numbers, and underscores';
				}
				return null;
			}
		});

		// If user cancelled the input
		if (!featureNameInput) {
			return;
		}

		const configPath = path.join(vscode.workspace.rootPath || '', 'feature_structure.json');

		let config;
		if (!fs.existsSync(configPath)) {
			vscode.window.showWarningMessage('feature_structure.json configuration file not found. Using standard structure.');
			config = {
				folders: [
					'data/datasources',
					'data/models',
					'data/repositories',
					'domain/entities',
					'domain/repositories',
					'domain/usecases',
					'presentation/cubit',
					'presentation/pages'
				]
			};
		} else {
			config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
		}

		const featurePath = path.join(uri.fsPath, featureNameInput);
		const folders = config.folders || [];

		// Create feature directory
		try {
			folders.forEach((folder: string) => {
				const folderPath = path.join(featurePath, folder);
				fs.mkdirSync(folderPath, { recursive: true });
			});

			vscode.window.showInformationMessage(`Folder structure for feature '${featureNameInput}' created successfully!`);
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Unknown error';
			vscode.window.showErrorMessage(`Error creating feature structure: ${errorMessage}`);
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }