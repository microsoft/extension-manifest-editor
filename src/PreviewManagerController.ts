/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

'use strict'
import * as vscode from 'vscode'
import PreviewManagerVSC from './PreviewManagerVSC'
import PreviewManagerVSTS from './PreviewManagerVSTS'
import BasePreviewManager from './BasePreviewManager'
import Utilities from './Utilities'
import {ExtensionConstants} from './Constants'


// This class initializes the previewmanager based on extension type and manages all the subscriptions
export default class PreviewManagerController {

    previewManager: BasePreviewManager;
    private disposable: vscode.Disposable;
    utilities: Utilities;
    webview: vscode.Webview;

    constructor(webview: vscode.Webview, utilities?: Utilities, previewManagerVSC?: PreviewManagerVSC, previewManagerVSTS?: PreviewManagerVSTS) {
        this.webview = webview;
        this.utilities = utilities && utilities || new Utilities();
        if (this.utilities.checkExtensionType()) {
            switch (ExtensionConstants.EXTENSION_TYPE) {
                case ExtensionConstants.VSC_EXTENSION:
                    this.previewManager = previewManagerVSC && previewManagerVSC || new PreviewManagerVSC();
                    break;
                case ExtensionConstants.VSTS_EXTENSION:
                    this.previewManager = previewManagerVSTS && previewManagerVSTS || new PreviewManagerVSTS();
                    break;
                default:
                    break;
            }
            new Promise<string>((resolve, reject) => {
                resolve(this.previewManager.generatePreview());
            }).then(data => this.webview.html = data);
            // subscribe to selection change event
            let subscriptions: vscode.Disposable[] = [];
            vscode.window.onDidChangeTextEditorSelection(this.onEvent, this, subscriptions)
            this.disposable = vscode.Disposable.from(...subscriptions);
        }
    }


    dispose() {
        this.disposable.dispose();
    }

    public onEvent() {
        new Promise<string>((resolve, reject) => {
            resolve(this.previewManager.getWebviewContent());
        }).then(data => this.webview.html = data);
    }

}