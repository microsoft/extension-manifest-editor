'use strict';
import * as vscode from 'vscode';
import {IDataProvider} from './IDataProvider'
import {ExtensionConstants} from './Constants'


export default class BaseDataProvider implements IDataProvider {
    
    public displayName: string;
    public version: string;
    public description: string;
    public publisher: string;
    public categories: string[];
    public tags: string[];
    public galleryBanner: {
        theme: string;
        color: string;
    }
    public preview: string;
    public imagePath: string;
    public license: string;
    public bugs: string;
    public homepage: string;
    public repository: string;

    constructor() {
        //Initialize the class with default values so that missing values from manifest can be handled
        this.displayName = "";
        this.version = "";
        this.description = "";
        this.publisher = "";
        this.categories = [];
        this.tags = [];
        this.galleryBanner = {theme : "",color: ""} 
        this.imagePath = "";
        this.license = "";
        this.bugs = "";
        this.homepage = "";
        this.repository = "";
        this.preview = "";
    }   


    public deserialize(input) : BaseDataProvider{
        if (input.version) {
            this.version = input.version;
        }
        if (input.description) {
            this.description = input.description;
        }
        if (input.publisher) {
            this.publisher = input.publisher;
        }
        if (input.categories) {
            this.categories = input.categories;
        }
        return this;
    }   
}




