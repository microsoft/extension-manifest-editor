'use strict';
import * as vscode from 'vscode';
import {ExtensionConstants, ErrorMessages} from './Constants'


export default class Utilities {

    showErrorMessage: boolean;
    constructor() {
        this.showErrorMessage = true;
    }

    checkFileType(): boolean {

        if (this.docIsJSON()) {
            this.showErrorMessage = true;
            if (!this.checkExtensionType()) {
                if (this.showErrorMessage) {
                    vscode.window.showErrorMessage(ErrorMessages.NO_MANIFEST);
                }
                return false;
            }
            return true;
        }
        else {
            vscode.window.showErrorMessage(ErrorMessages.NO_MANIFEST);
            return false;
        }
    }

    checkExtensionType(): boolean {

        if (this.isActive("package.json") && this.checkEnginesAttribute(true)) {
            // Extension is for VScode
            ExtensionConstants.EXTENSION_TYPE = ExtensionConstants.VSC_EXTENSION;
            return true;
        }
        else if (this.isActive("vss-extension.json")) {
            // Extension is for VSTS
            ExtensionConstants.EXTENSION_TYPE = ExtensionConstants.VSTS_EXTENSION;
            return true;
        }
        else {
            ExtensionConstants.EXTENSION_TYPE = ExtensionConstants.NO_EXTENSION;
            return false;
        }
    }

    //this function is called only when the current file is package.json
    checkEnginesAttribute(vocal: boolean): boolean {
        let data = this.getTextFromActiveEditor();
        this.showErrorMessage = true;
        try {
            let json = JSON.parse(data);
            if (json.engines) {
                if (json.engines.vscode) {
                    return true;
                }
            }
            return false;
        } catch (e) {
            if (vocal) {
                this.showErrorMessage = false;
                vscode.window.showErrorMessage(ErrorMessages.DIRTY_JSON);
            }
            return false;
        }

    }

    docIsJSON(): boolean {
        return vscode.window.activeTextEditor.document.languageId.localeCompare("json") == 0;
    }

    getTextFromActiveEditor() {
        return vscode.window.activeTextEditor.document.getText();
    }

    getExtensionType() {
        return ExtensionConstants.EXTENSION_TYPE;
    }

    isActive(file) {
        return vscode.window.activeTextEditor.document.fileName.toLowerCase().includes(file);
    }

}






