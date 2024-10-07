import PageObject from "../abstract/page-object";

export default class TextInput extends PageObject {

    locator: string;

    constructor(locator: string, parent: WebdriverIO.Element = undefined) {
        super(parent);
        this.locator = locator;
    }

    async isDisplayed() {
        return await this.elementIsDisplayed(this.locator);
    }

    async setText(text: string) {
        await this.setElementText(this.locator, text);
    }

    async getCurrentText() {
        return await this.getElementAttribute(this.locator, 'value');
    }
}