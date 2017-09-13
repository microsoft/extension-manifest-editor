/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';
import * as vscode from 'vscode';
import BasePreviewManager from './BasePreviewManager'
import DataProviderVSC from './DataProviderVSC'
import VscHtmlGenerator from './VscHtmlGenerator'
import {ErrorMessages} from './Constants'

export default class PreviewManagerVSC extends BasePreviewManager {

    constructor() {
        super();
        this.HTMLGenerator = new VscHtmlGenerator();
    }

    public generatePreview(): Promise<string> {
        let self = this;
        return new Promise<string>(function (resolve, reject) {
            self.HTMLGenerator = new VscHtmlGenerator();
            resolve(self.makePreview());
        }).then((promise) => {
            self.oldPreview = promise; 
            return promise;
        }).catch(() => {
            return ErrorMessages.GENERATE_PREVIEW_ERROR;
        })

    }
    protected deserializeJSON(json) {
        this.packageData = new DataProviderVSC().deserialize(json);
    }

    protected printExtensionType() {
        console.log("VSC_EXTENSION");
    }
}

