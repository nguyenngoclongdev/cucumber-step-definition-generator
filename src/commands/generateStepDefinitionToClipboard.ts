import { GherkinCodeParse } from '@nguyenngoclongdev/cucumber-gherkin';
import * as vscode from 'vscode';
import { ExtensionConfiguration } from '../extension';
import { getFeatureContent, getLanguage, getRunner } from '../utils';

export const generateStepDefinitionToClipboard = async (uri: vscode.Uri, config: ExtensionConfiguration): Promise<void> => {
    try {
        const runner = getRunner(config.runner);
        const language = getLanguage(config.language);

        // Get feature content
        const featureContent = getFeatureContent(uri);

        // Generate code
        const gherkinCodeParse = new GherkinCodeParse(runner, language);
        const output = gherkinCodeParse.parse(featureContent);

        // Write to clipboard
        const clipboard = vscode.env.clipboard;
        await clipboard.writeText(output);
        vscode.window.showInformationMessage('Step definitions copied to the clipboard!');
    } catch (error) {
        const errorMessage = (error as Error)?.message;
        vscode.window.showErrorMessage('Generate step definitions failed!', errorMessage);
    }
};
