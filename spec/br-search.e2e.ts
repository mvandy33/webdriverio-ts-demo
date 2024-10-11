import Player from "../model/player";
import Header from "../page/baseball-reference/header";
import Home from "../page/baseball-reference/home";
import PlayerProfile from "../page/baseball-reference/player-profile";
import SearchResults from "../page/baseball-reference/search-results";
import { compare, navigate } from "../util/helpers";

const rickey = new Player({
    firstName: 'Rickey',
    lastName: 'Henderson',
    nickname: 'Man of Steal',
    hallOfFame: true
});

const brooks = new Player({
    firstName: 'Brooks',
    lastName: 'Robinson',
    nickname: 'Human Vacuum Cleaner',
    hallOfFame: true
});

const bigUnit = new Player({
    firstName: 'Randy',
    lastName: 'Johnson',
    nickname: 'Big Unit',
    hallOfFame: true
});

describe('Baseball reference search functionality', () => {
    before(async () => {
        await navigate();
    });

    describe('for Rickey Henderson', () => {
        it('should submit a search for "Henderson"', async () => {
            await new Home().header.submitSearch(rickey.info.lastName);
            expect(await new SearchResults().isDisplayed())
                .toBe(true);
        });

        it('should display Rickey Henderson as the first result', async () => {
            let firstResult = (await new SearchResults().getResults())[0];
            let firstResultInfo = await firstResult.getInfo();
            expect(compare(firstResultInfo, rickey.info))
                .toBe('');
        });

        it('should view the player profile and display the correct player info', async () => {
            await (await new SearchResults().getResult(rickey)).view();
            let profileInfo = await new PlayerProfile().getInfo();
            expect(compare(profileInfo, rickey.info))
                .toBe('');
        });
    });

    describe('for Brooks Robinson', () => {
        it('should submit a search for "Robinson"', async () => {
            await new Header().submitSearch(brooks.info.lastName);
            expect(await new SearchResults().isDisplayed())
                .toBe(true);
        });

        it('should include Brooks Robinson somewhere in the list', async () => {
            expect(await new SearchResults().isResultListed(brooks))
                .toBe(true);
        });

        it('should view the player profile and display the correct player info', async () => {
            await (await new SearchResults().getResult(brooks)).view();
            let profileInfo = await new PlayerProfile().getInfo();
            expect(compare(profileInfo, brooks.info))
                .toBe('');
        });
    });

    describe('for "Big Unit"', () => {
        it('should submit a search for "Big Unit" and land directly on Randy Johnson\'s player profile', async () => {
            await new Header().submitSearch(bigUnit.info.nickname);
            expect(await new PlayerProfile().isDisplayed())
                .toBe(true);
        });

        it('should display the correct player info', async () => {
            let profileInfo = await new PlayerProfile().getInfo();
            expect(compare(profileInfo, bigUnit.info))
                .toBe('');
        });
    });
});