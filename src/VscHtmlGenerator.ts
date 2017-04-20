/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import BaseHTMLGenerator from './BaseHTMLGenerator'
import {IDataProvider} from './IDataProvider'
import DataKeyValuePair from './DataKeyValuePair'

export default class VscHtmlGenerator extends BaseHTMLGenerator {

    constructor() {
        super();
        
    }    
    protected updateHTML() {
        super.updateHTML(); 
        let resources: string = this.getResources();
        let installOptions: string = this.getInstallOptions();
        let screenShot: string = this.getScreenShots();        
        // This array hold the key-value relations
        let dataMapArray: DataKeyValuePair[] = [
            new DataKeyValuePair("${installation}", installOptions),
            new DataKeyValuePair("${screenshot}", screenShot),
            new DataKeyValuePair("${resources}", resources),
            
        ]
        //Replace the values in HTML template using the dataMapArray
        for (var item of dataMapArray) {
            this.html = this.html.replace(item.placeholder, item.value);
        }
    }


    public getInstallOptions(): string {
        let installCommand: string = (() => {
            if (this.packageData.name) {
                return `ext install ${this.packageData.name}`
            }
            return "";
        })();
        return `<div class="vscode-copy-command-wrapper " id="2">
                    <div class="vscode-item-action ">                       
                        <div class="vscode-install-title ">Installation</div>
                        <div class="vscode-install-instructions ">Launch VS Code Quick Open (<code>Ctrl+P</code>), paste the following command, and type enter.</div>
                        <div class="vscode-install-info-container ">
                            <div class="vscode-command-container ">
                                <input type="text" class="vscode-command-input " readonly="" value="${installCommand}" id="vscode-command-input">
                                <button class="copy-to-clipboard-button " title="Copy to clipboard" id="copy-to-clipboard-button">Copy</button>
                            </div>
                            <a class="vscode-moreinformation ux-section-banner-custom-bg " href="" target="">More Info</a>
                        </div>
                    </div>
                </div>`
    }

     private getResources(): string {

        let support = "";
        let getStarted = "";
        let homePage = "";
        let license = "";
        if (this.packageData.bugs) {
            support = `<li><a href="" target="" rel="noreferrer noopener">Issues</a></li>`
        }
        if (this.packageData.repository) {
            getStarted = `<li><a href="" target="" rel="noreferrer noopener">Repository</a></li>`
        }
        if (this.packageData.homepage) {
            homePage = `<li><a href="" target="" rel="noreferrer noopener">HomePage</a></li>`
        }
        if (this.packageData.license) {
            license = `<li><a href="" target="" rel="noreferrer noopener">License</a></li>`
        }
        return `<div class="ux-section-resources">                                    
                    <div class="ux-section-h1 right">Resources</div>
                        <div>
                            <ul>
                                ${support}
                                ${getStarted}
                                ${homePage}
                                ${license}
                            </ul>
                        </div>
                    </div>`
    }

    private getScreenShots(): string {
        return "";
    }
}
