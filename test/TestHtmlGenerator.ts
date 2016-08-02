const expect = require('chai').expect;
const sinon = require('sinon');

import * as vscode from 'vscode';
import {TestUtilities} from './TestUtilities'
import VscHtmlGenerator from '../src/VscHtmlGenerator'
import VstsHtmlGenerator from '../src/VstsHtmlGenerator'
import * as Constants from '../src/Constants'


export default function testHtmlGenerator(HTMLGenerator, expectedHTML: string) {
    let htmlGenerator: VscHtmlGenerator | VstsHtmlGenerator;
    beforeEach(function () {
        htmlGenerator = new HTMLGenerator();
    })

    context("constructor", function () {
        it("should assign resource paths", function () {
            let extensionPath: string = vscode.extensions.getExtension(Constants.ExtensionConstants.EXTENSION_ID).extensionPath;
            expect(htmlGenerator.cssPath).to.equal(`${extensionPath}/${Constants.FilePaths.CSS_path}`);
            expect(htmlGenerator.htmlPath).to.equal(`${extensionPath}/${Constants.FilePaths.HTML_PATH}`);
        })
    })

    context("generateHTML", function () {
        it("should throw error if template is not available", sinon.test(function () {
            htmlGenerator.htmlPath = "";
            htmlGenerator.generateHTML(TestUtilities.testPackage,
                TestUtilities.testPackage.markdownHtmlOutput).then(function (message) {
                    expect(message).to.equal(Constants.ErrorMessages.READ_HTML_ERROR);
                })
        }));
        it("should generate the final html", sinon.test(function () {
            let cssPath = "csspath";
            htmlGenerator.cssPath = cssPath;
            htmlGenerator.generateHTML(TestUtilities.testPackage,
                TestUtilities.testPackage.markdownHtmlOutput).then(function (data) {
                    data = data.split(" ").join("");
                    data = data.split("\n").join("");
                    data = data.split("\r").join("");
                    expectedHTML = expectedHTML.split(" ").join("");
                    expectedHTML = expectedHTML.split("\n").join("");
                    expectedHTML = expectedHTML.split("\r").join("");
                    expect(data, "Generated HTML not as expected").to.equal(expectedHTML);
                })
        }));
    });
}





