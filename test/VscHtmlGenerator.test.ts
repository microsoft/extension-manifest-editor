/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

const expect = require('chai').expect;
const sinon = require('sinon');

import * as vscode from 'vscode';
import testHtmlGenerator from './TestHtmlGenerator'
import VscHtmlGenerator from '../src/VscHtmlGenerator'
let expectedHTML: string;


describe("VscHtmlGenerator", sinon.test(function(){
    loadExpectedHtml();
    testHtmlGenerator(VscHtmlGenerator,expectedHTML);
}))


function loadExpectedHtml(){
    expectedHTML = `<!DOCTYPEhtml><htmllang="en"><head><metahttp-equiv="content-type"content="text/html;charset=utf-8"><linkrel="stylesheet"type="text/css"href="csspath"><title>Preview</title><style>.ux-section-banner-custom-bg{background-color:color;color:#000</style></head><body><divclass="ux-section-bannerux-section-banner-custom-bg"><divclass="ux-section-coregallery-centered-content"><table><tbody><tr><tdclass="item-img"><imgalt="InvalidImagePath"src="imagePath"></td><tdclass="item-header"><divclass="item-header-content"><h1><spanclass="ux-item-nameux-section-banner-custom-bg">displayName</span></h1><spanclass="ux-item-preview"></span><divclass="ux-item-second-row-wrapper"><divclass="ux-item-publisher"><h2><aclass="ux-item-publisher-linkux-section-banner-custom-bg">publisher</a></h2></div></div><divclass="ux-item-shortdescux-section-banner-custom-bg">description</div><divclass="ux-item-actionux-section-banner-custom-bg"><divclass="vscode-copy-command-wrapper"id="2"><divclass="vscode-item-action"><divclass="vscode-install-title">Installation</div><divclass="vscode-install-instructions">LaunchVSCodeQuickOpen(<code>Ctrl+P</code>),pastethefollowingcommand,andtypeenter.</div><divclass="vscode-install-info-container"><divclass="vscode-command-container"><inputtype="text"class="vscode-command-input"readonly=""value="extinstallname"id="vscode-command-input"><buttonclass="copy-to-clipboard-button"title="Copytoclipboard"id="copy-to-clipboard-button">Copy</button></div><aclass="vscode-moreinformationux-section-banner-custom-bg"href=""target="">MoreInfo</a></div></div></div></div></div></td></tr></tbody></table></div></div><divclass="gallery-centered-contentgallery-centered-content-custom-bg"><divclass="ux-section-details"><table><tbody><tr><tdclass="ux-itemdetails-left"><divclass="markdown">markdownHtmlOutput</div><br></td><tdclass="ux-itemdetails-right"role="complementary"><divclass="ux-section-media"></div><divclass="meta-data-list-holder"><divclass="meta-data-list-container"><div><divclass="ux-section-meta-data-list"><divclass="ux-section-headerright">Categories</div><divclass="meta-data-list"><aclass="meta-data-list-linkgallery-element-focus-style-light"href=""target="">categories</a></div></div><divclass="ux-section-meta-data-list"><divclass="ux-section-headerright">Tags</div><divclass="meta-data-list"><aclass="meta-data-list-linkgallery-element-focus-style-light"href=""target="">tags</a></div></div></div></div><divclass="ux-section-resources"><divclass="ux-section-h1right">Resources</div><div><ul><li><ahref=""target=""rel="noreferrernoopener">Support</a></li><li><ahref=""target=""rel="noreferrernoopener">GetStarted</a></li><li><ahref=""target=""rel="noreferrernoopener">License</a></li></ul></div></div><divclass="ux-section-other"><divclass="ux-section-h1right"">MoreInfo</div><div><tableclass="ux-table-metadata"><tbody><tr><td><div>Version</div></td><td><div>version</div></td></tr><tr><td><div>Publisher</div></td><td><div>publisher</div></td></tr></tbody></table></div><spanclass="ux-social-icons"><span><divclass="item-share-container"><atitle="twitter"href=""target=""><divclass="social-linkshare-twitter-button"></div></a><atitle="facebook"href=""target=""><divclass="social-linkshare-facebook-button"></div></a><atitle="email"href=""target=""><divclass="social-linkshare-email-button"></div></a></div></span></span></div></td></tr></tbody></table></div></div></div></body></html>`
}
