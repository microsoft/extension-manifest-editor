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

    let disposableSidePreview = vscode.commands.registerCommand('extension.generateSidePreview', () => {

        init(vscode.ViewColumn.Two, context);

    });
    let disposableStandalonePreview = vscode.commands.registerCommand('extension.generateStandalonePreview', () => {

        init(vscode.ViewColumn.One, context);

    });
    context.subscriptions.push(disposableSidePreview);
    context.subscriptions.push(disposableStandalonePreview);
}

// This method is called when extension is deactivated
export function deactivate() {
    
}

function init(viewColumn: number, context: vscode.ExtensionContext) {
    let utilities = new Utilities();
    let proceed = utilities.checkFileType();
    if (proceed) {
        let previewManagerController = new PreviewManagerController(
            vscode.window.createWebviewPanel('extension', 'Extension Manifest', viewColumn, {}).webview
        );
    }
}



