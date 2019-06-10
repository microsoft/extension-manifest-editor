
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
const expect = require('chai').expect;
const sinon = require('sinon');

import * as vscode from 'vscode';
import {ExtensionConstants} from '../src/Constants'
import PreviewManagerController from '../src/PreviewManagerController'


describe("PreviewManagerController", function () {

    class dummyPreviewManager {
        generatePreview() { };
        getWebviewContent() { }
    }
    class Utilities {
        checkExtensionType() { };
    }
    let previewManagerController;
    let utilities;
    let webview;

    beforeEach(function () {
        utilities = new Utilities();
        webview = vscode.window.createWebviewPanel('extension', 'Extension Manifest', 1, {}).webview;
    })
    context("constructor", function () {

        it("should assign previewManager to previewManagerVSC ", sinon.test(function () {

            let checkExtensionTypeStub = this.stub(utilities, "checkExtensionType", function () {
                ExtensionConstants.EXTENSION_TYPE = ExtensionConstants.VSC_EXTENSION;
                return true;
            })

            let previewManagerVSCStub = sinon.createStubInstance(dummyPreviewManager);
            let previewManagerVSTSStub = this.stub();
            previewManagerController = new PreviewManagerController(webview, utilities, previewManagerVSCStub, previewManagerVSTSStub);

            sinon.assert.calledOnce(checkExtensionTypeStub);
            sinon.assert.calledOnce(previewManagerVSCStub.generatePreview);
            expect(previewManagerController.previewManager).to.equal(previewManagerVSCStub);

        }))
        it("should assign previewManager to previewManagerVSTS ", sinon.test(function () {

            let checkExtensionTypeStub = this.stub(utilities, "checkExtensionType", function () {
                ExtensionConstants.EXTENSION_TYPE = ExtensionConstants.VSTS_EXTENSION;
                return true;
            })

            let previewManagerVSCStub = this.stub();
            let previewManagerVSTSStub = sinon.createStubInstance(dummyPreviewManager);
            previewManagerController = new PreviewManagerController(webview, utilities, previewManagerVSCStub, previewManagerVSTSStub);

            sinon.assert.calledOnce(checkExtensionTypeStub);
            sinon.assert.calledOnce(previewManagerVSTSStub.generatePreview);
            expect(previewManagerController.previewManager).to.equal(previewManagerVSTSStub);

        }))
        it("should not assign previewManager ", sinon.test(function () {
            let checkExtensionTypeStub = this.stub(utilities, "checkExtensionType", function () {

                return false;
            })

            let previewManagerStub = sinon.createStubInstance(dummyPreviewManager);
            previewManagerController = new PreviewManagerController(webview, utilities, previewManagerStub, previewManagerStub);

            sinon.assert.calledOnce(checkExtensionTypeStub);
            sinon.assert.notCalled(previewManagerStub.generatePreview);
            expect(previewManagerController.previewManager).to.equal();
        }))
    })

    context("onEvent", function () {
        it("should call generatePreview method and getWebviewContent method of previewManager", sinon.test(function () {
            let checkExtensionTypeStub = this.stub(utilities, "checkExtensionType", function () {
                ExtensionConstants.EXTENSION_TYPE = ExtensionConstants.VSC_EXTENSION;
                return true;
            })

            let previewManagerStub = sinon.createStubInstance(dummyPreviewManager);

            previewManagerController = new PreviewManagerController(webview, utilities, previewManagerStub, previewManagerStub);
            previewManagerController.onEvent();

            sinon.assert.calledOnce(checkExtensionTypeStub);
            expect(previewManagerController.previewManager).to.equal(previewManagerStub);
            sinon.assert.called(previewManagerStub.generatePreview);
            sinon.assert.calledOnce(previewManagerStub.getWebviewContent);
            
        }))
    })
})