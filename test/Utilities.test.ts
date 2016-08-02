const expect = require('chai').expect;
const sinon = require('sinon');

import * as vscode from 'vscode';


import Utilities from '../src/Utilities'
import * as Constants from '../src/Constants'

describe("Utilities", function () {
    let utilities: Utilities;
    beforeEach(function () {
        utilities = new Utilities();
    })

    context("checkFileType", function () {
        it("should return false if active doc is not JSON", sinon.test(function () {
            let docIsJSONStub = this.stub(utilities, "docIsJSON", () => { return false });
            let result = utilities.checkFileType();
            sinon.assert.calledOnce(docIsJSONStub);
            expect(result).to.equal(false);
        }))
        it("should return false if active JSON doc is not a valid manifest", sinon.test(function () {
            let docIsJSONStub = this.stub(utilities, "docIsJSON", () => { return true });
            let checkExtensionTypeStub = this.stub(utilities, "checkExtensionType", () => { return false });
            let result = utilities.checkFileType();
            sinon.assert.calledOnce(docIsJSONStub);
            sinon.assert.calledOnce(checkExtensionTypeStub);
            expect(result).to.equal(false);
        }))
        it("should return true on a valid manifest", sinon.test(function () {
            let docIsJSONStub = this.stub(utilities, "docIsJSON", () => { return true });
            let checkExtensionTypeStub = this.stub(utilities, "checkExtensionType", () => { return true });
            let result = utilities.checkFileType();
            sinon.assert.calledOnce(docIsJSONStub);
            sinon.assert.calledOnce(checkExtensionTypeStub);
            expect(result).to.equal(true);

        }))
    })
    context("checkEnginesAttribute", function () {
        it("should return true if JSON includes engines attribute", sinon.test(function () {
            let json = `{
                            "engines": {
                                "vscode": "^1.0.0"
                            }
                        }`;
            let getTextFromActiveEditorStub = this.stub(utilities, "getTextFromActiveEditor", () => { return json; });
            let result = utilities.checkEnginesAttribute(false);
            sinon.assert.calledOnce(getTextFromActiveEditorStub);
            expect(result).to.equal(true);
        }));
        it("should return false on dirty JSON", sinon.test(function () {
            let json = `{
                            engines": {
                                "vscode": "^1.0.0"
                            }
                        }`;
            let getTextFromActiveEditorStub = this.stub(utilities, "getTextFromActiveEditor", () => { return json; });
            let result = utilities.checkEnginesAttribute(false);
            sinon.assert.calledOnce(getTextFromActiveEditorStub);
            expect(result).to.equal(false);

        }));
        it("should return false on missing engines attribute", sinon.test(function () {
            let json = `{
                            "engines": {
                                "vscode": ""
                            }
                        }`;
            let getTextFromActiveEditorStub = this.stub(utilities, "getTextFromActiveEditor", () => { return json; });
            let result = utilities.checkEnginesAttribute(false);
            sinon.assert.calledOnce(getTextFromActiveEditorStub);
            expect(result).to.equal(false);
        }));
    })
    context("checkExtensionType", function () {
        it("should return true  and assign EXTENSION_TYPE if extension type is VSC", sinon.test(function () {
            let isActiveStub = this.stub(utilities, "isActive", () => { return true });
            let checkEnginesAttributeStub = this.stub(utilities,"checkEnginesAttribute", ()=>{return true});
            let result = utilities.checkExtensionType();
            sinon.assert.calledOnce(checkEnginesAttributeStub);
            sinon.assert.calledOnce(isActiveStub);
            expect(result).to.equal(true);
            expect(utilities.getExtensionType()).to.equal(Constants.ExtensionConstants.VSC_EXTENSION);

        }));
        it("should return true and assign EXTENSION_TYPE if extension type is VSTS", sinon.test(function () {
            let isActiveStub = this.stub(utilities, "isActive", () => { return true });
            let checkEnginesAttributeStub = this.stub(utilities,"checkEnginesAttribute", ()=>{return false});
            let result = utilities.checkExtensionType();
            sinon.assert.calledOnce(checkEnginesAttributeStub);
            sinon.assert.calledTwice(isActiveStub);
            expect(result).to.equal(true);
            expect(utilities.getExtensionType()).to.equal(Constants.ExtensionConstants.VSTS_EXTENSION);

        }));
        it("should return false otherwise",sinon.test(function(){
            let isActiveStub = this.stub(utilities, "isActive", () => { return false });
            let result = utilities.checkExtensionType();
            sinon.assert.calledTwice(isActiveStub);
            expect(result).to.equal(false);
            expect(utilities.getExtensionType()).to.equal(Constants.ExtensionConstants.NO_EXTENSION);
        }));
    })

})


