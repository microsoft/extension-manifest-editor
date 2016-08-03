
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

export interface IDataProvider {

    // Fields
    name?: string;
    displayName: string;
    version: string;
    description: string;
    publisher: string;
    categories: string[];
    tags: string[];
    galleryBanner: { theme: string,color: string};
    imagePath: string;
    license: string;
    bugs: string;
    homepage: string;
    preview: string;
    repository: string;
    readMePath?: string;
    screenShots?: string;
    targets?: string;
    // Methods
    deserialize(input);

}


