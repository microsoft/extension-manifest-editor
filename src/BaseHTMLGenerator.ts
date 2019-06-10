/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as vscode from 'vscode';
import {IDataProvider} from './IDataProvider'
import DataKeyValuePair from  './DataKeyValuePair'
import {ExtensionConstants, EnvironVariables, ErrorMessages, FilePaths} from './Constants'

const fs = require('fs');
export default class BaseHtmlGenerator {

    public cssPath: string;
    public htmlPath: string;
    public html: string;
    public packageData: IDataProvider;
    public markdownHtmlOutput: string;

    constructor() {
        let extensionPath: string = vscode.extensions.getExtension(ExtensionConstants.EXTENSION_ID).extensionPath;
        this.cssPath = vscode.Uri.file(`${extensionPath}/${FilePaths.CSS_path}`).with({ scheme: 'vscode-resource' }).toString();
        this.htmlPath = `${extensionPath}/${FilePaths.HTML_PATH}`;
    }

    public generateHTML(packageData: IDataProvider, markdownHtmlOutput: string): Promise<string> {
        this.packageData = packageData;
        this.markdownHtmlOutput = markdownHtmlOutput;
        //Read the HTML skeleton file from Resources
        return new Promise<string>((resolve, reject) => {
            resolve(this.readHTML());
        }).then((promise) => {
            return promise;
        }).catch(() => {
            return ErrorMessages.GENERATE_HTML_ERROR;
        })
    }

    private readHTML(): Promise<string> {
        let self = this;
        return new Promise<string>(function (resolve, reject) {
            fs.readFile(self.htmlPath, function (err, data) {
                if (err) {
                    return reject(err);
                }
                self.html = data.toString();
                // Put the data in HTML skeleton
                self.updateHTML();
                // The HTML is ready to be returned
                resolve(self.html);
            });
        }).then((html) => {
            if (EnvironVariables.DEBUG) {
                self.writeHTML();
            }
            return html;
        }).catch(() => {
            return ErrorMessages.READ_HTML_ERROR;
        })
    }

    protected updateHTML() {

        let customStyles: string = this.getCustomStyles();
        let itemImage: string = this.getItemImage();
        let categories: string = this.getCategories();
        let tags: string = this.getTags();
        let projectDetails: string = this.getProjectDetails();
        let preview: string = this.getPreviewDetails();

        // This array hold the key-value relations
        let dataMapArray: DataKeyValuePair[] = [
            new DataKeyValuePair("${image}", itemImage),
            new DataKeyValuePair("${cssPath}", this.cssPath),
            new DataKeyValuePair("${displayName}", this.packageData.displayName),
            new DataKeyValuePair("${publisher}", this.packageData.publisher),
            new DataKeyValuePair("${publisher}", this.packageData.publisher),
            new DataKeyValuePair("${description}", this.packageData.description),
            new DataKeyValuePair("${markdownHtmlOutput}", this.markdownHtmlOutput),
            new DataKeyValuePair("${categories}", categories),
            new DataKeyValuePair("${version}", this.packageData.version),
            new DataKeyValuePair("${customStyle}", customStyles),
            new DataKeyValuePair("${tags}", tags),
            new DataKeyValuePair("${projectDetails}", projectDetails),
            new DataKeyValuePair("${preview}", preview),
        ]

        //Replace the values in HTML template using the dataMapArray
        for (var item of dataMapArray) {
            this.html = this.html.replace(item.placeholder, item.value);
        }
    }

    public getCustomStyles(): string {
        let self = this;
        return ` <style>
            .ux-section-banner-custom-bg {
            background-color: ${(() => {
                if (self.packageData.galleryBanner.color) {
                    return self.packageData.galleryBanner.color;
                }
                return "#eff1f3";
            })()
            };
            color: ${  (() => {
                if (self.packageData.galleryBanner.theme === "dark") {
                    return "#fff";
                }
                else {
                    return '#000';
                }
            })()
            }                
                </style>`

    }

    private getItemImage(): string {
        let self = this;
        if (self.packageData.imagePath) {
            const src = vscode.Uri.parse(self.packageData.imagePath).with({ scheme: 'vscode-resource' });
            return `<img alt = "Invalid Image Path" src= "${src}"  >`;
        }
        return "";
    }

    private getCategories(): string {
        let categories = "";
        if (this.packageData.categories.length) {
            for (let i = 0; i < this.packageData.categories.length; i++) {
                categories += `<a class="meta-data-list-link gallery-element-focus-style-light" href="" target="">${this.packageData.categories[i]}</a>`
            }
            return `<div class="ux-section-meta-data-list">
                    <div class="ux-section-header right">Categories</div>
                    <div class="meta-data-list">
                        ${categories}
                    </div>
                </div>`;
        }
        return "";
    }

    private getTags(): string {
        let tags = ""
        if (this.packageData.tags.length) {
            for (let i = 0; i < this.packageData.tags.length; i++) {
                tags += `<a class="meta-data-list-link gallery-element-focus-style-light" href="" target="">${this.packageData.tags[i]}</a>`
            }
            return `<div class="ux-section-meta-data-list">
                    <div class="ux-section-header right" >Tags</div>
                        <div class="meta-data-list">
                            ${tags}                                 
                        </div>
                </div>`
        }
        return "";
    }    

    private getProjectDetails(): string {
        if (this.packageData.repository.includes("github.com")) {
            let a = this.packageData.repository.search(".com");
            let b = this.packageData.repository.length;
            let url: string = this.packageData.repository.substring(a + 4, b);
            return `<div class="ux-section-project-details">
                        <div class="ux-section-h1 right">Project Details</div>
                        <div>
                            <ul>
                                <li>
                                    <a>${this.getMarkIconSVG()}<p>${url}</p></a>
                                </li>
                                <li>
                                    <a>${this.getPullRequestSVG()}<p># Pull Requests</p></a>
                                </li>
                                <li>
                                    <a>${this.getOpenIssuesSVG()}<p># Open Issues</p></a>
                                </li>
                                <li>
                                    <a>${this.getClockIconSVG()}<p>Last commit: # ago</p></a>
                                </li>
                            </ul>
                        </div>
                    </div>`
        }
        return ``;
    }

    private getPreviewDetails() {
        if (this.packageData.preview === "true") {
            return `<span class="ux-item-preview ux-section-banner-custom-bg">Preview</span>`
        }
        return ``;

    }

    private getMarkIconSVG() {
        return `<svg aria-hidden="true" class="octicon octicon-mark-github" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>`;
    }

    private getPullRequestSVG() {
        return `<svg aria-hidden="true" class="octicon octicon-git-pull-request" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path d="M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46 2.35 8.78 2.03 8 2H7V0L4 3l3 3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10 15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993 1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98 1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>`;
    }

    private getOpenIssuesSVG() {
        return `<svg aria-hidden="true" class="octicon octicon-issue-opened" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>`;
    }

    private getClockIconSVG() {
        return '<svg aria-hidden="true" class="octicon octicon-history" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path d="M8 13H6V6h5v2H8v5zM7 1C4.81 1 2.87 2.02 1.59 3.59L0 2v4h4L2.5 4.5C3.55 3.17 5.17 2.3 7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-.34.03-.67.09-1H.08C.03 7.33 0 7.66 0 8c0 3.86 3.14 7 7 7s7-3.14 7-7-3.14-7-7-7z"></path></svg>'
    }



    // The function writes the generated HTML to the current workspace folder
    private writeHTML() {
        if (vscode.workspace.rootPath) {
            fs.writeFile(`${vscode.workspace.rootPath}/${FilePaths.OUTPUT_PATH}`, this.html, function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        }
    }
}

