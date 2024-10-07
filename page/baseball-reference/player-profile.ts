import { by, combine } from "../../util/by";
import PageObject from "../abstract/page-object";
import Button from "../controls/button";
import Label from "../controls/label";
import Link from "../controls/link";

export default class PlayerProfile extends PageObject {

    locator: string;

    nameLabel: Label;
    hofLink: Link;
    nicknamesLink: Link;
    moreInfoButton: Button;

    constructor() {
        super();
        this.locator = by.css('[id="info"][class*="players"]');

        this.nameLabel = new Label(combine(this.locator, by.css('h1')));
        this.hofLink = new Link(combine(this.locator, by.css('[href*="hof"]')));
        this.nicknamesLink = new Link(combine(this.locator, by.css('[href*="player-nicknames"]')));
        this.moreInfoButton = new Button(combine(this.locator, by.id('meta_more_button')));
    }

    async isDisplayed() {
        return await this.elementIsDisplayed(this.locator);
    }

    async getInfo() {
        await this.viewAllInfo();
        return {
            fullName: await this.getName(),
            hallOfFame: await this.isHallOfFamer(),
            nickname: await this.getNickname()
        };
    }

    async getName() {
        return await this.nameLabel.getText();
    }

    async isHallOfFamer() {
        return await this.hofLink.isDisplayed();
    }

    async getNickname() {
        if (await this.nicknamesLink.isDisplayed()) {
            return (await this.nicknamesLink.getText()).split(' or ')[0].trim();
        }
    }

    async viewAllInfo() {
        if (await this.moreInfoButton.isDisplayed()) {
            await this.moreInfoButton.click();
        }
    }
}