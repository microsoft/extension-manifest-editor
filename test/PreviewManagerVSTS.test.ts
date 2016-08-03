/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

const expect = require('chai').expect;
const sinon = require('sinon');
const assert = require("chai").assert;
import * as vscode from 'vscode';
import PreviewManagerVSTS from '../src/PreviewManagerVSTS'
import {testPreviewManager} from './TestPreviewManager'


describe("PreviewManagerVSTS", function () {
    testPreviewManager(PreviewManagerVSTS);
})




