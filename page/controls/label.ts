import PageObject from "../abstract/page-object";

export default class Label extends PageObject {

    locator: string;

    /**
     * Can be used to represent any static text element
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
}