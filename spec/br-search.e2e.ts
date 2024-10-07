import Player from "../model/player";
import Home from "../page/baseball-reference/home";
import { navigate } from "../util/helpers";

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

const threeFinger = new Player({
    firstName: 'Mordecai',
    lastName: 'Brown',
    nickname: 'Three Finger',
    hallOfFame: true
});

describe('Baseball reference search functionality', () => {
    before(async () => {
        await navigate();
    });

    describe('for Rickey Henderson', () => {
        it('should submit a search for "Henderson"', async () => {
            await new Home().header.submitSearch(rickey.info.lastName);
        });
    });
});