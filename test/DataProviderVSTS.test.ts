/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

const expect = require('chai').expect;
const sinon = require('sinon');

import * as vscode from 'vscode';
import {TestUtilities} from './TestUtilities'
import DataProviderVSTS from '../src/DataProviderVSTS'

describe("DataProviderVSTS", function () {
    let VstsDP;
    beforeEach(function () {
        VstsDP = new DataProviderVSTS();
    });
    context("constructor", function () {
        it("should initialize with empty values", function () {
            TestUtilities.expectToBeEmpty(VstsDP);
        })
    });

    context("deserialize", function () {
        it("should assign values from JSON object", function () {

            let JSONObject = {
                name: "name",
                icons: {
                    default: "test.png"
                },
                branding: {
                    color: "ffffff",
                    theme: "light"
                },
                tags: ["vscode"],
                content: {
                    license: {
                        path: "license",
                    },
                    details: {
                        path: "readme.md"
                    }
                },
                screenshots: [
                    {
                        path: "screenshot.png"
                    }
                ],
                targets: [
                    {
                        id: "id"
                    }
                ]
            };

            VstsDP.deserialize(JSONObject);
            expect(VstsDP.displayName).to.equal(JSONObject.name);
            expect(VstsDP.galleryBanner).to.deep.equal(JSONObject.branding);
            expect(VstsDP.tags).to.equal(JSONObject.tags);
            expect(VstsDP.license).to.equal(JSONObject.content.license.path);
            expect(VstsDP.readMePath).to.equal(JSONObject.content.details.path);
            let rootPath: string = vscode.workspace.rootPath;
            expect(VstsDP.imagePath).to.equal(vscode.Uri.file(`${rootPath}/${ JSONObject.icons.default}`).toString());
            expect(VstsDP.screenShots).to.equal(vscode.Uri.file(`${rootPath}/${JSONObject.screenshots[0].path}`).toString());
            expect(VstsDP.targets).to.equal(JSONObject.targets[0].id);

        })

    })

})