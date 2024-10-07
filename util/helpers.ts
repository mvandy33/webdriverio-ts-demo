/**
 * Navigate to the app start page
 */
export async function navigate() {
    await browser.url(process.env.ENVIRONMENT === 'test' ? '/app/' : '/');
}

/**
 * Clear an input by sending the number of backspace commands necessary (all at once)
 * @param input 
 */
export async function clear(input: WebdriverIO.Element) {
    let currentValue = await input.getValue();
    let backstring = '';
    for (let i = 0; i < currentValue.length; i++) {
        backstring += '\uE003';
    }
    await input.addValue(backstring);
}