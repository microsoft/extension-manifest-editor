/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

'use strict';
import * as vscode from 'vscode';
import {IDataProvider} from './IDataProvider'
import BaseDataProvider from './BaseDataProvider'
export default class DataProviderVSC extends BaseDataProvider {

    name: string;
    readMePath: string;
    constructor() {
        //Initialize the class with default values so that missing values from manifest can be handled
        super();
        this.name = "";
        this.readMePath = "";
    }
    deserialize(input): DataProviderVSC {

        super.deserialize(input);
        if (input.name) {
            this.name = input.name;
        }
        if (input.displayName) {
            this.displayName = input.displayName;
        }
        if (input.keywords) {
            this.tags = input.keywords;
        }
        if (input.galleryBanner) {
            this.galleryBanner.color = input.galleryBanner.color;
            this.galleryBanner.theme = input.galleryBanner.theme;
        }
        if (input.icon) {
            let rootPath: string = vscode.workspace.rootPath;
            this.imagePath = vscode.Uri.file(`${rootPath}/${input.icon}`).toString();
        }
        if (input.license) {
            this.license = input.license;
        }
        if (input.repository) {
            if (input.repository.url) {
                this.repository = input.repository.url;
            }
        }
        if (input.homepage) {
            this.homepage = input.homepage;
        }
        if (input.bugs) {
            if (input.bugs.url) {
                this.bugs = input.bugs.url;
            }
        }
        if (input.preview) {
            this.preview = input.preview;
        }
        this.readMePath = "readme.md";
        return this;
    }
}