describe('Initial demo spec', () => {
    before(async () => {
        await browser.url('/');
    });

    it('should navigate to baseball reference', async () => {
        expect(await browser.getUrl())
            .toEqual('https://www.baseball-reference.com/');
    });
});