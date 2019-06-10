/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

'use strict';
import * as vscode from 'vscode';
import {IDataProvider} from './IDataProvider'
import DataProviderVSC from './DataProviderVSC'
import DataProviderVSTS from './DataProviderVSTS'
import {IHtmlGenerator} from './IHtmlGenerator'
import * as Constants from './Constants'
import Utilities from './Utilities'

const marked = require('markdown-it')({
    html: true,
    linkify:true
    });
 
const fs = require('fs');


export default class BasePreviewManager {

    public packageData: IDataProvider;
    public markdownHtmlOutput: string;
    protected rootPath: string;
    public oldPreview: string;
    private oldJSON: string;
    public HTMLGenerator: IHtmlGenerator;
    public utilities: Utilities;

    constructor() {
        this.rootPath = vscode.workspace.rootPath;
        this.oldPreview = "";
        this.oldJSON = "";
        this.utilities = new Utilities();

    }

    public getWebviewContent() {
        let self = this;
        return new Promise<string>(function (resolve, reject) {
            resolve(self.generatePreview())
        }).then((data) => {
            self.oldPreview = data;
            return data;
        }).catch(() => {
            return self.oldPreview;
        });
    }

    public generatePreview(): Promise<string> {
        console.log("Base generatePreview called: SHOULDNOT HAPPEN");
        return;
    }

    protected makePreview(): Promise<string> {
        let self = this;
        return new Promise<string>((resolve, reject) => {
            // Read the manifest file
            resolve(self.getManifest());
        }).then((promise) => {
            return promise;
        }).catch(() => {
            return Constants.ErrorMessages.MAKE_PREVIEW_ERROR;
        })
    }

    private getManifest(): Promise<string> {

        let self = this;
        // if the active open window is .md type, then return the view with oldJSON"
        if (vscode.window.activeTextEditor && self.utilities.isActive(".md")) {
            // Prepare the packageData
            this.deserializeJSON(this.oldJSON);
            // Read the README file 
            return new Promise<string>((resolve, reject) => {
                resolve(self.getReadMe());
            }).then((promise) => {
                return promise;
            }).catch(() => {
                return Constants.ErrorMessages.GET_MANIFEST_ERROR;
            })
        }
        // Assume that the manifest file is open. Even if it is not opened , the following code just returns the oldPreview
        else if (vscode.window.activeTextEditor && this.isManifestOpen()) {
            return this.getManifestFromActiveEditor();
        }
        else {
            return this.returnOldPreview(Constants.ErrorMessages.NO_MANIFEST);
        }
    }

    private getManifestFromActiveEditor(): Promise<string> {

        let editor = vscode.window.activeTextEditor;
        let data = editor.document.getText();
        // Check to ensure that manifest file is not empty
        if (data) {
            return this.parseManifestFromActiveEditor(data);
        }
        //The manifest file is empty
        else {
            return new Promise<string>((resolve) => {
                resolve(Constants.ErrorMessages.EMPTY_MANIFEST);
            }).then((message) => {
                return message;
            }).catch(() => {
                return Constants.ErrorMessages.GET_MANIFEST_ERROR;
            })
        }
    }

    public parseManifestFromActiveEditor(data: string): Promise<string> {
        let json;
        let self = this;
        try {
            json = JSON.parse(data);
        }
        catch (error) {
            return this.returnOldPreview(Constants.ErrorMessages.DIRTY_JSON);
        }
        //this function prepares the packageData
        this.deserializeJSON(json);
        // Update the oldJSON
        this.oldJSON = json;
        // Read the README file 
        return new Promise<string>((resolve, reject) => {
            resolve(self.getReadMe());
        }).then((promise) => {
            return promise;
        }).catch(() => {
            return Constants.ErrorMessages.GET_MANIFEST_ERROR;
        })
    }

    public getReadMe(): Promise<string> {

        let self = this;
        let readmePathURI: vscode.Uri = this.getReadMePathURI();
        return new Promise<string>(function (resolve, reject) {
            //Read the markdown if the current open file is a readme file
            if ( self.packageData.readMePath !=""  && self.utilities.isActive(self.packageData.readMePath)) {

                let data = vscode.window.activeTextEditor.document.getText();
                self.markdownHtmlOutput = self.convertMDtoHTML(data);
                resolve(self.HTMLGenerator.generateHTML(self.packageData, self.markdownHtmlOutput));
            }
            //else read the file from disk
            else {
                fs.readFile(readmePathURI.fsPath, function (err, data) {
                    // handle the case when README.md is not available in the path
                    if (err) {
                        self.markdownHtmlOutput = Constants.ErrorMessages.NO_README;
                        return resolve(self.HTMLGenerator.generateHTML(self.packageData, self.markdownHtmlOutput));
                    }
                    self.markdownHtmlOutput = self.convertMDtoHTML(data.toString());
                    // read,update and write the HTML file to current workspace
                    resolve(self.HTMLGenerator.generateHTML(self.packageData, self.markdownHtmlOutput));
                });
            }
        }).then((promise) => {
            return promise;
        }).catch((promise) => {
            return promise;
        })
    }

    protected deserializeJSON(json) {
        console.log("Base deserializeJSON called: SHOULDNOT HAPPEN");
        return;
    }

    protected getReadMePathURI(): vscode.Uri {
        return vscode.Uri.file(`${this.rootPath}/${this.packageData.readMePath}`);
    }

    private convertMDtoHTML(md: string): string {
        return marked.render(md)
    }

    

    private isVscManifest() {
        return this.utilities.isActive("package.json") && this.utilities.checkEnginesAttribute(false) && Constants.ExtensionConstants.EXTENSION_TYPE === Constants.ExtensionConstants.VSC_EXTENSION;
    }

    private isVstsManifest() {
        return this.utilities.isActive("vss-extension.json") && Constants.ExtensionConstants.EXTENSION_TYPE === Constants.ExtensionConstants.VSTS_EXTENSION;
    }

    private isManifestOpen() {
        return this.isVscManifest() || this.isVstsManifest();
    }

    private returnOldPreview(errorMessage: string) {
        let self = this;
        return new Promise<string>((resolve) => {
            // Ensure that oldPreview is not empty
            if (self.oldPreview) {
                resolve(self.oldPreview);
            }
            else {
                resolve(errorMessage);
            }
        }).then((message) => {
            return message;
        }).catch(() => {
            return Constants.ErrorMessages.GET_MANIFEST_ERROR;
        })
    }

    protected printExtensionType() {
        console.log("UNKNOWN");
    }
}