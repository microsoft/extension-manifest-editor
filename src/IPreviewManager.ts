'use strict';
import * as vscode from 'vscode';
export interface IPreviewManager{
    //methods
    update(uri: vscode.Uri);
    generatePreview(): Promise<string>
}