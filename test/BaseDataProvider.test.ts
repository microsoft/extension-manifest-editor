/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

const expect = require('chai').expect;
const sinon = require('sinon');
import * as vscode from 'vscode';
import BaseDataProvider from '../src/BaseDataProvider';
import {TestUtilities} from './TestUtilities'


describe("base data provider", function () {
    let BDP;

    beforeEach(function () {
        BDP = new BaseDataProvider();

    });
    context("constructor", function () {
        it("should have empty initial values", function () {
            TestUtilities.expectToBeEmpty(BDP);
        })
    })
    context("deserialize", function () {
        it("should assign values from JSON object", function () {

            let JSONObject = {
                description: "description",
                version: "version",
                publisher: "publisher",
                categories: ["other"]
            };

            BDP.deserialize(JSONObject);
            expect(BDP.description).to.equal(JSONObject.description);
            expect(BDP.version).to.equal(JSONObject.version);
            expect(BDP.publisher).to.equal(JSONObject.publisher);
            expect(BDP.categories).to.equal(JSONObject.categories);

        })
    })
});


