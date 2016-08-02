import {IDataProvider} from './IDataProvider'

export interface IHtmlGenerator {

    // Methods
    //This function reads the template form the resources folder, updates it with the user provided values and writes the final HTML to a file on disk in the current workspace.
    generateHTML(packageData: IDataProvider, markdownHtmlOutput: string): Promise<string>;

}