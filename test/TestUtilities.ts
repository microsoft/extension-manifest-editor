const expect = require('chai').expect;
const sinon = require('sinon');
import { Messages }from './Messages'
import * as vscode from 'vscode';


export module TestUtilities {

    export function expectToBeEmpty(val) {
        if (typeof val === "string") {
            expect(val, Messages.EMPTY_STRING).to.equal("");
        }
        else {
            for (var i in val) {
                expectToBeEmpty(val[i]);
            }
        }
        // else skip the other types
    }
    export var testPackage = {
        // Fields
        name: "name",
        displayName: "displayName",
        version: "version",
        description: "description",
        publisher: "publisher",
        categories: ["categories"],
        tags: ["tags"],
        galleryBanner: { theme: "theme", color: "color" },
        imagePath: "imagePath",
        license: "license",
        bugs: "bugs",
        homepage: "homepage",
        repository: "repository",
        readMePath: "readMePath",
        screenShots: "screenShots",
        targets: "targets",
        installation: "installation",
        projectDetails: "projectDetails",
        resources: "resources",
        markdownHtmlOutput: "markdownHtmlOutput",
        preview: "preview",
        deserialize: function(){},
    }

}

