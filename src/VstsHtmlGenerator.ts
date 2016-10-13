/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import BaseHTMLGenerator from './BaseHTMLGenerator'
import {IDataProvider} from './IDataProvider'
import DataKeyValuePair from './DataKeyValuePair'


export default class VstsHtmlGenerator extends BaseHTMLGenerator {

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

    private getInstallOptions(): string {
        if (this.packageData.targets === "Microsoft.VisualStudio.Services") {
            return `<button class="ux-button install">Install</button><button class="ux-button install">Download</button>`;
        }
        else if (this.packageData.targets === "Microsoft.VisualStudio.Services.Integration") {
            return `<button class="ux-button install">Get Started</button>`;
        }
        else if (this.packageData.targets === "Microsoft.VisualStudio.Services.Cloud") {
            return `<button class="ux-button install">Install</button>`;
        }
        return ``;
    }

    private getScreenShots(): string {
        if (this.packageData.screenShots) {
            return `<div class="item-screenshot">
                    <img class="img-screenshot" alt = "invalid" src="${this.packageData.screenShots}">
                </div>`
        }
        return ``;
    }

    private getResources(): string {

        let support = "";
        let getStarted = "";
        let license = "";
        let homePage = "";
        if (this.packageData.bugs) {
            support = `<li><a href="" target="" rel="noreferrer noopener">Support</a></li>`
        }
        if (this.packageData.repository) {
            getStarted = `<li><a href="" target="" rel="noreferrer noopener">Get Started</a></li>`
        }
        if (this.packageData.homepage) {
            homePage = `<li><a href="" target="" rel="noreferrer noopener">Learn</a></li>`
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
}