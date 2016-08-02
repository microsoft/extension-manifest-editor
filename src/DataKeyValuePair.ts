/**
 * A class to hold the key-value pairs where the key is the placeholdr in HTML template and the value is content read from user provided files
 */
export default class DataKeyValuePair {
    constructor(public placeholder: string, public value: string) {
        this.placeholder = placeholder;
        this.value = value;
    }
}