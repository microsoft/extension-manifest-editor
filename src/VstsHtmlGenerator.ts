import BaseHTMLGenerator from './BaseHTMLGenerator'
import {IDataProvider} from './IDataProvider'
import DataKeyValuePair from './DataKeyValuePair'


export default class VstsHtmlGenerator extends BaseHTMLGenerator {

    constructor() {
        super();
    }

    protected updateHTML() {
        super.updateHTML();
        let installOptions: string = this.getInstallOptions();
        let screenShot: string = this.getScreenShots();
        // This array hold the key-value relations
        let dataMapArray: DataKeyValuePair[] = [
            new DataKeyValuePair("${installation}", installOptions),
            new DataKeyValuePair("${screenshot}", screenShot),
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
}