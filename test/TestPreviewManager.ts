
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
const expect = require('chai').expect;
const sinon = require('sinon');
const assert = require("chai").assert;
import * as vscode from 'vscode';
import PreviewManagerVSC from '../src/PreviewManagerVSC'
import PreviewManagerVSTS from '../src/PreviewManagerVSTS'
import {ErrorMessages} from '../src/Constants'
import {TestUtilities} from './TestUtilities'
import BaseHtmlGenerator from '../src/BaseHTMLGenerator'
export function testPreviewManager(PM) {
    let previewManager: PreviewManagerVSC | PreviewManagerVSTS;
    beforeEach(function () {
        previewManager = new PM();
        previewManager.HTMLGenerator = sinon.createStubInstance(BaseHtmlGenerator)
    });
    context("generatePreview", function () {
        it("should return error on empty manifest", sinon.test(function () {
            
            let makePreviewSpy = this.spy(previewManager,"makePreview");
            let getManifestSpy = this.spy(previewManager,"getManifest");
            
            previewManager.generatePreview().then(function (data) {

                expect(data).to.equal(ErrorMessages.NO_MANIFEST);
                sinon.assert.calledOnce(getManifestSpy);
                sinon.assert.calledOnce(makePreviewSpy);
                
            })
        }))
        it("should call getManifest then getReadMe", sinon.test(function () {

            let isActiveStub = this.stub(previewManager.utilities, "isActive", function () { return true });
            let deserializeJSONSpy = this.spy(previewManager, "deserializeJSON");
            let getReadMeStub = this.stub(previewManager, "getReadMe", function () { return ""; });
            previewManager.generatePreview().then(function () {
                try {
                    sinon.assert.calledOnce(isActiveStub);
                    sinon.assert.calledOnce(deserializeJSONSpy);
                    sinon.assert.calledOnce(getReadMeStub);
                }
                catch (error) {
                    console.log(error);
                }
            });
        }))
    })

    context("parseManifestFromActiveEditor", function () {
        it("should handle dirty JSON", sinon.test(function () {
            let json = `{ "name" name }`
            previewManager.parseManifestFromActiveEditor(json).then(function (message) {
                expect(message).to.equal(ErrorMessages.DIRTY_JSON);
            })
        }))
        it("should call deserializeJSON and getReadMe for valid JSON", sinon.test(function () {
            let success = "success";
            let getReadMeStub = this.stub(previewManager, "getReadMe", () => { return success });
            let deserializeJSONStub = this.stub(previewManager, "deserializeJSON");
            let json = "{}";
            previewManager.parseManifestFromActiveEditor(json).then(function (message) {

                sinon.assert.callOrder(deserializeJSONStub, getReadMeStub);
                expect(message).to.equal(success);
            })
        }))
    })

    context("getReadMe", function () {

        it("should call generateHTML in the if block", sinon.test(function () {
            previewManager.packageData = TestUtilities.testPackage;
            previewManager.packageData.readMePath = "";
            let convertMDtoHTMLStub = this.stub(previewManager, "convertMDtoHTML")

            previewManager.getReadMe().then(function (message) {
                sinon.assert.calledOnce(convertMDtoHTMLStub);
                sinon.assert.calledOnce(previewManager.HTMLGenerator.generateHTML);
            })
        }))
        it("should return NO_README error", sinon.test(function () {
            previewManager.packageData = TestUtilities.testPackage;
            previewManager.packageData.readMePath = "NO_README";
            previewManager.getReadMe().then(function (message) {
                sinon.assert.calledOnce(previewManager.HTMLGenerator.generateHTML);
                expect(previewManager.markdownHtmlOutput).to.equal(ErrorMessages.NO_README)
            })
        }))
    })
}