import { navigate } from "../util/helpers";

describe('Initial demo spec', () => {
    before(async () => {
        await navigate();
    });

    it('should navigate to baseball reference', async () => {
        expect(await browser.getUrl())
            .toEqual('https://www.baseball-reference.com/');
    });
});