import PageObject from "../abstract/page-object";

export default class Link extends PageObject {

    locator: string;

    /**
     * Used to interact with links
     * @param locator 
     * @param parent 
     */
    constructor(locator: string, parent: WebdriverIO.Element = undefined) {
        super(parent);
        this.locator = locator;
    }

    async isDisplayed() {
        return await this.elementIsDisplayed(this.locator);
    }

    async getText() {
        return await this.getElementText(this.locator);
    }

    async getTargetUrl() {
        return await this.getElementAttribute(this.locator, 'href');
    }

    async click() {
        await this.clickElement(this.locator);
    }
}