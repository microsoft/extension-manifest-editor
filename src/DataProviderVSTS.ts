/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

'use strict';
import * as vscode from 'vscode';
import {IDataProvider} from './IDataProvider'
import BaseDataProvider from './BaseDataProvider'

export default class DataProviderVSTS extends BaseDataProvider {

    readMePath: string;
    screenShots: string;
    targets: string;
    constructor() {
        super();
        //Initialize the class with default values so that missing values from manifest can be handled
        this.readMePath = "";
        this.screenShots = "";
        this.targets = "";

    }
    deserialize(input): DataProviderVSTS {

        super.deserialize(input);
        if (input.name) {
            this.displayName = input.name;
        }
        if (input.tags) {
            this.tags = input.tags;
        }
        if (input.branding) {
            this.galleryBanner.color = input.branding.color;
            this.galleryBanner.theme = input.branding.theme;
        }
        if (input.icons) {
            if (input.icons.default) {
                let rootPath: string = vscode.workspace.rootPath;
                this.imagePath = vscode.Uri.file(`${rootPath}/${input.icons.default}`).fsPath;
            }
        }
        if (input.content) {
            if (input.content.license) {
                if (input.content.license.path) {
                    this.license = input.content.license.path;
                }
            }
            if (input.content.details) {
                if (input.content.details.path) {
                    this.readMePath = input.content.details.path;
                }
            }
        }
        if (input.screenshots) {
            if (input.screenshots[0]) {
                if (input.screenshots[0].path) {
                    let rootPath: string = vscode.workspace.rootPath;
                    this.screenShots = vscode.Uri.file(`${rootPath}/${input.screenshots[0].path}`).fsPath;
                }
            }
        }
        if (input.targets) {
            if (input.targets[0]) {
                if (input.targets[0].id) {
                    this.targets = input.targets[0].id;
                }
            }
        }
        if (input.galleryFlags) {
            for (let flag of input.galleryFlags) {
                if (flag.toLocaleLowerCase().includes("preview")) {
                    this.preview = "true";
                }
            }
        }
        return this;
    }
}

