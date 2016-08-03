export module ExtensionConstants {    
    export const VSC_EXTENSION: number = 1;
    export const VSTS_EXTENSION: number = 2;
    export const NO_EXTENSION: number = 0;
    export var EXTENSION_TYPE: number = NO_EXTENSION;
    export const EXTENSION_ID = `ms-devlabs.extension-manifest-editor`
    export const PREVIEW_URI = 'details-preview://authority/detailspreview';
}

export module EnvironVariables {
    export const DEBUG = false;
}

export module ErrorMessages {
    export const NO_MANIFEST = "Active editor doesn't show a valid JSON manifest - please open your extension's manifest file";
    export const DIRTY_JSON = "The JSON is invalid. Please correct it";
    export const EMPTY_MANIFEST = "Empty Manifest File";
    export const NO_README = "No overview has been entered by publisher";
    export const GET_MANIFEST_ERROR = "An error occured in getManifest";
    export const MAKE_PREVIEW_ERROR = "An error occured in makePreview";
    export const GENERATE_HTML_ERROR = "An error occured in generateHTML";
    export const GENERATE_PREVIEW_ERROR = "An error occured in generatePreview";
    export const READ_HTML_ERROR = "An error occured in readHTML";
}

export module FilePaths {
    export const CSS_path = "Resources/template_default.css";
    export const HTML_PATH = "Resources/template_skeleton.html";
    export const OUTPUT_PATH = "preview.html";
}