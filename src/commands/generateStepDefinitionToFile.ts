import { GherkinCodeParse } from '@nguyenngoclongdev/gherkin';
import { Uri, window, workspace } from 'vscode';
import { ExtensionConfiguration } from '../extension';
import { getFeatureFilePath, getLanguage, getLanguageExt, getRunner, showErrorMessageWithDetail } from '../utils/utils';
import { wfs } from '../utils/wfs';
import path = require('path');

const showTextDocument = (stepDefinitionFilePath: string): void => {
    const existingDoc = workspace.textDocuments.find(doc => doc.uri.fsPath === stepDefinitionFilePath);
    if (existingDoc) {
        const visibleEditor = window.visibleTextEditors.find(editor => editor.document === existingDoc);
        if (visibleEditor) {
            window.showTextDocument(visibleEditor.document, visibleEditor.viewColumn, false);
        } else {
            window.showTextDocument(existingDoc, { preserveFocus: false });
        }
    } else {
        const stepDefinitionFileUri = Uri.file(stepDefinitionFilePath);
        window.showTextDocument(stepDefinitionFileUri, { preserveFocus: false });
    }
};

export const generateStepDefinitionToFileAsync = async (uri: Uri, config: ExtensionConfiguration): Promise<void> => {
    try {
        const runner = getRunner(config.runner);
        const language = getLanguage(config.language);

        // Get feature file path
        const featureFilePath = getFeatureFilePath(uri);
        if (!featureFilePath) {
            window.showWarningMessage('Open .feature or .features file before running the command!');
            return;
        }

        // Get step definition file path
        const featureFileExt = path.parse(featureFilePath).ext;
        const stepDefinitionFileExt = getLanguageExt(language);
        const stepDefinitionFilePath = featureFilePath.slice(0, -featureFileExt.length).concat(stepDefinitionFileExt);

        // Get feature content
        const featureFileContent = await wfs.readFileAsync(featureFilePath);

        // Generate code
        let stepDefinitionOutput = "";
        const gherkinCodeParse = new GherkinCodeParse(runner, language);
        const isRegenerateStepDefinition = await wfs.existAsync(stepDefinitionFilePath);
        if (isRegenerateStepDefinition) {
            const stepDefinitionFileContent = await wfs.readFileAsync(stepDefinitionFilePath);
            stepDefinitionOutput = gherkinCodeParse.parse(featureFileContent, stepDefinitionFileContent);
        } else {
            stepDefinitionOutput = gherkinCodeParse.parse(featureFileContent);
        }

        // Check the output content
        const isEmptyStepDefinitionOutput = stepDefinitionOutput.trim() === '';
        if (isEmptyStepDefinitionOutput) {
            window.showInformationMessage('No changes detected in the content of the feature file!');
            return;
        }

        // Write output to file
        const dirPath = path.dirname(stepDefinitionFilePath);
        await wfs.createDirectoryAsync(dirPath);
        if (isRegenerateStepDefinition) {
            await wfs.appendFileAsync(stepDefinitionFilePath, stepDefinitionOutput);
        } else {
            await wfs.writeFileAsync(stepDefinitionFilePath, stepDefinitionOutput);
        }

        // Auto open file after generate step definition
        showTextDocument(stepDefinitionFilePath);

        // Show message
        window.showInformationMessage('Step definitions generated successfully!', 'View Output Path')
            .then((selection) => {
                if (selection === 'View Output Path') {
                    window.showInformationMessage(stepDefinitionFilePath, { modal: true });
                }
            });
    } catch (error) {
        showErrorMessageWithDetail('Failed to generate step definitions!', error);
    }
};
