const expect = require('chai').expect;
const sinon = require('sinon');

import * as vscode from 'vscode';
import {TestUtilities} from './TestUtilities'
import DataProviderVSC from '../src/DataProviderVSC'

describe("DataProviderVSC", function () {
    let VscDP;
    beforeEach(function () {
        VscDP = new DataProviderVSC();
    });
    context("constructor", function () {
        it("should initialize with empty values", function () {
            TestUtilities.expectToBeEmpty(VscDP);
        })
    });

    context("deserialize", function () {
        it("should assign values from JSON object", function () {

            let JSONObject = {
                name: "name",
                displayName: "displayName",
                icon: "test.png",
                galleryBanner: {
                    color: "ffffff",
                    theme: "light"
                },
                keywords: ["vscode"],
                license: "license",
                repository: {
                    url: "repo"
                },
                bugs: {
                    url: "bugs"
                }
            };

            VscDP.deserialize(JSONObject);
            expect(VscDP.name).to.equal(JSONObject.name);
            expect(VscDP.displayName).to.equal(JSONObject.displayName);
            expect(VscDP.galleryBanner).to.deep.equal(JSONObject.galleryBanner);
            expect(VscDP.tags).to.equal(JSONObject.keywords);
            expect(VscDP.license).to.equal(JSONObject.license);
            expect(VscDP.repository).to.equal(JSONObject.repository.url);
            expect(VscDP.bugs).to.equal(JSONObject.bugs.url);
            expect(VscDP.readMePath).to.equal("readme.md");
            let rootPath: string = vscode.workspace.rootPath;
            expect(VscDP.imagePath).to.equal(vscode.Uri.file(`${rootPath}/${ JSONObject.icon}`).fsPath);


        })

    })

})