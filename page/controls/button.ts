import PageObject from "../abstract/page-object";

export default class Button extends PageObject {

    locator: string;

    /**
     * Used to interact with button elements
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

    async click() {
        await this.clickElement(this.locator);
    }
}