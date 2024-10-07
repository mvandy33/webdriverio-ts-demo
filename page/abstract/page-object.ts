import { clear } from "../../util/helpers";

export default abstract class PageObject {

    context: WebdriverIO.Browser | WebdriverIO.Element;

    /**
     * Class from which all concrete page objects should inherit
     * @param context 
     */
    constructor(context: WebdriverIO.Browser | WebdriverIO.Element = browser) {
        this.context = context;
    }

    async getElement(locator: string): Promise<WebdriverIO.Element> {
        return await this.context.$(locator);
    }

    async getElementList(locator: string): Promise<WebdriverIO.ElementArray> {
        return await this.context.$$(locator);
    }

    async elementExists(locator: string) {
        let element = await this.getElement(locator);
        return element.error == undefined;
    }

    async elementIsDisplayed(locator: string) {
        if (await this.elementExists(locator)) {
            return await (await this.getElement(locator)).isDisplayed();
        }
        return false;
    }

    async clickElement(locator: string) {
        let element = await this.getElement(locator);
        await element.scrollIntoView();
        await element.click();
    }

    async setElementText(locator: string, text: string) {
        if (text != undefined) {
            let input = await this.getElement(locator);
            await input.scrollIntoView();
            await clear(input);
            await input.addValue(text);
        }
    }

    async getElementText(locator: string) {
        let element = await this.getElement(locator);
        await element.scrollIntoView();
        return await element.getText();
    }

    async getElementAttribute(locator: string, attribute: string) {
        let element = await this.getElement(locator);
        return await element.getAttribute(attribute);
    }
}