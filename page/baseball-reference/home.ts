import { by, combine } from "../../util/by";
import PageObject from "../abstract/page-object";
import Header from "./header";

export default class Home extends PageObject {

    locator: string;

    header: Header;

    constructor() {
        super();
        this.locator = by.css('[class*="br front_page"]');

        this.header = new Header(combine(this.locator, by.id('header')));
    }
}