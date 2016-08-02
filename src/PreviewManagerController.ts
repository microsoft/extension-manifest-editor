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

    constructor(utilities?: Utilities, previewManagerVSC?: PreviewManagerVSC, previewManagerVSTS?: PreviewManagerVSTS) {
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
            this.previewManager.generatePreview();
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
        this.previewManager.update(vscode.Uri.parse(ExtensionConstants.PREVIEW_URI));
    }

}