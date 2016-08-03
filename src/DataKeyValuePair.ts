/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

/**
 * A class to hold the key-value pairs where the key is the placeholdr in HTML template and the value is content read from user provided files
 */
export default class DataKeyValuePair {
    constructor(public placeholder: string, public value: string) {
        this.placeholder = placeholder;
        this.value = value;
    }
}