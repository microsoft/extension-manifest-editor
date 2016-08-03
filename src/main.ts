/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';
import * as vscode from 'vscode';
import PreviewManagerController from './PreviewManagerController'
import Utilities from './Utilities'
import {ExtensionConstants, ErrorMessages} from './Constants'


export function activate(context: vscode.ExtensionContext) {

    let previewUri = vscode.Uri.parse(ExtensionConstants.PREVIEW_URI);
    let disposableSidePreview = vscode.commands.registerCommand('extension.generateSidePreview', () => {

        init(vscode.ViewColumn.Two, context, previewUri);

    });
    let disposableStandalonePreview = vscode.commands.registerCommand('extension.generateStandalonePreview', () => {

        init(vscode.ViewColumn.One, context, previewUri);

    });
    context.subscriptions.push(disposableSidePreview);
    context.subscriptions.push(disposableStandalonePreview);
}

// This method is called when extension is deactivated
export function deactivate() {
    
}

function init(viewColumn: number, context: vscode.ExtensionContext, previewUri: vscode.Uri) {
    let utilities = new Utilities();
    let proceed = utilities.checkFileType();
    if (proceed) {
        let previewManagerController = new PreviewManagerController();
        context.subscriptions.push(previewManagerController);
        let registration = vscode.workspace.registerTextDocumentContentProvider('details-preview', previewManagerController.previewManager);
        return vscode.commands.executeCommand('vscode.previewHtml', previewUri, viewColumn).then((success) => {
        });
    }
}



