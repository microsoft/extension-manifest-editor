
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import {IDataProvider} from './IDataProvider'

export interface IHtmlGenerator {

    // Methods
    //This function reads the template form the resources folder, updates it with the user provided values and writes the final HTML to a file on disk in the current workspace.
    generateHTML(packageData: IDataProvider, markdownHtmlOutput: string): Promise<string>;

}