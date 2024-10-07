import { by, combine } from "../../util/by";
import PageObject from "../abstract/page-object";
import ButtonInput from "../controls/button-input";
import TextInput from "../controls/text-input";

export default class Header extends PageObject {

    locator: string;
    
    searchInput: TextInput;
    searchButton: ButtonInput;

    constructor(locator: string = undefined) {
        super();
        this.locator = locator ?? by.id('header');

        this.searchInput = new TextInput(combine(this.locator, by.css('input[type="search"]')));
        this.searchButton = new ButtonInput(combine(this.locator, by.css('input[type="submit"]')));
    }

    async isDisplayed() {
        return await this.elementIsDisplayed(this.locator);
    }

    async submitSearch(searchString: string) {
        await this.searchInput.setText(searchString);
        await this.searchButton.click();
    }
}