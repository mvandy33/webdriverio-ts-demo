import { clear, removeAds } from "../../util/helpers";

export default abstract class PageObject {

    finder: WebdriverIO.Browser | WebdriverIO.Element;

    /**
     * Class from which all concrete page objects should inherit
     * @param finder 
     */
    constructor(finder: WebdriverIO.Browser | WebdriverIO.Element = browser) {
        this.finder = finder;
    }

    async getElement(locator: string) {
        await removeAds();
        return await this.finder.$(locator).getElement();
    }

    async getElementList(locator: string) {
        await removeAds();
        return await this.finder.$$(locator).getElements();
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
        await element.scrollIntoView({block: 'nearest', inline: 'nearest'});
        await element.click();
    }

    async setElementText(locator: string, text: string) {
        if (text != undefined) {
            let input = await this.getElement(locator);
            await input.scrollIntoView({block: 'nearest', inline: 'nearest'});
            await clear(input);
            await input.addValue(text);
        }
    }

    async getElementText(locator: string) {
        let element = await this.getElement(locator);
        await element.scrollIntoView({block: 'nearest', inline: 'nearest'});
        return await element.getText();
    }

    async getElementAttribute(locator: string, attribute: string) {
        let element = await this.getElement(locator);
        return await element.getAttribute(attribute);
    }
}