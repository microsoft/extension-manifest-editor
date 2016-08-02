'use strict';
import * as vscode from 'vscode';
import BasePreviewManager from './BasePreviewManager'
import DataProviderVSTS from './DataProviderVSTS'
import VstsHtmlGenerator from './VstsHtmlGenerator'
import {ErrorMessages} from './Constants'

export default class PreviewManagerVSTS extends BasePreviewManager {

    constructor() {
        super();
        this.HTMLGenerator = new VstsHtmlGenerator();
    }
    public generatePreview(): Promise<string> {
        let self = this;
        return new Promise<string>(function (resolve, reject) {
            self.HTMLGenerator = new VstsHtmlGenerator();
            resolve(self.makePreview());
        }).then((promise) => {
            return promise;
        }).catch(() => {
            return ErrorMessages.GENERATE_PREVIEW_ERROR;
        })

    }
    protected deserializeJSON(json) {
        this.packageData = new DataProviderVSTS().deserialize(json);
    }

    protected printExtensionType() {
        console.log("VSTS_EXTENSION");
    }

}