import Player from "../../model/player";
import { by, combine } from "../../util/by";
import { compare } from "../../util/helpers";
import ListPageObject from "../abstract/list-page-object";
import Matchable from "../abstract/matchable";
import PageObject from "../abstract/page-object";
import Label from "../controls/label";
import Link from "../controls/link";

export default class SearchResults extends ListPageObject {

    locator: string;

    searchItem: string;

    /**
     * The baseball reference search results page
     */
    constructor() {
        super();
        this.locator = by.css('[class*="search-results"]');

        this.searchItem = combine(this.locator, by.css('[class="search-item"]'));
    }

    async isDisplayed() {
        return await this.elementIsDisplayed(this.locator);
    }

    async getResults() {
        return await this.getPageObjectList(SearchItem, this.searchItem);
    }

    async getResult(player: Player) {
        return await this.getPageObjectMatch(SearchItem, this.searchItem, player.info);
    }

    async isResultListed(player: Player) {
        return (await this.getResult(player)) != undefined;
    }
}

class SearchItem extends PageObject implements Matchable {

    nameLink: Link;
    hofBadge: Label;
    nicknameLabel: Label;

    constructor(parent: WebdriverIO.Element) {
        super(parent);

        this.nameLink = new Link(by.css('[class*="search-item-name"] > a'), parent);
        this.hofBadge = new Label(by.css('[class*="search-hof"]'), parent);
        this.nicknameLabel = new Label(by.css('[class*="search-item-alt-names"]'), parent);
    }

    async getInfo() {
        return {
            fullName: await this.getName(),
            hallOfFame: await this.isHallOfFamer(),
            nickname: await this.getNickname()
        };
    }

    async getName() {
        return (await this.nameLink.getText()).split('(')[0].trim();
    }

    async isHallOfFamer() {
        return await this.hofBadge.isDisplayed();
    }

    async getNickname() {
        let nicknameString = await this.nicknameLabel.getText();
        if(nicknameString.includes('nickname')) {
            return nicknameString.split(': ').pop().split(',')[0].trim();
        }
    }

    async view() {
        await this.nameLink.click();
    }

    async isMatch(expected: Player) {
        let actual = await this.getInfo();
        return compare(actual, expected) === '';
    }
}