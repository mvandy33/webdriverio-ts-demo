import PageObject from "../abstract/page-object";

export default class ButtonInput extends PageObject {

    locator: string;

    constructor(locator: string, parent: WebdriverIO.Element = undefined) {
        super(parent);
        this.locator = locator;
    }

    async isDisplayed() {
        return await this.elementIsDisplayed(this.locator);
    }

    async getText() {
        return await this.getElementAttribute(this.locator, 'value');
    }

    async click() {
        await this.clickElement(this.locator);
    }
}