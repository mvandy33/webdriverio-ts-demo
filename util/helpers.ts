import * as _ from 'lodash';

/**
 * Navigate to the app start page
 */
export async function navigate() {
    await browser.url('/');
    await removeAds();
}

/**
 * Remove ads on the page
 * - baseball-reference.com does not allow setTimeout or setInterval, so this
 *   must be called on each page load or before each webdriver interaction
 */
export async function removeAds() {
    await browser.executeScript(`
        selectors = ['[class*="adblock"]', '[id*="google_ads"]', [id="modal-container"], [id="modal-overlay"]];
        for (let selector of selectors) {
            ads = document.querySelectorAll(selector);
            for (let ad of ads){
                ad.remove();
            }
        }
    `, []);
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

/**
 * Compare two object for equality
 * @param actual 
 * @param expected 
 * @returns Empty string if equal - string with object descriptions if not equal
 */
export function compare(actual: object, expected: object) {
    let pruned = prune(actual, expected);
    if (!_.isEqual(pruned.result1, pruned.result2)) {
        return `${JSON.stringify(pruned.result1, null, 2)}\n\ndid not equal\n\n${JSON.stringify(pruned.result2, null, 2)}`
    }
    return '';
}

/**
 * Get two objects that have only common properties from the initial inputs
 * @param obj1 
 * @param obj2 
 * @returns 
 */
function prune(obj1: object, obj2: object) {
    let sharedKeys = Object.keys(obj1).filter(key => Object.keys(obj2).includes(key));
    return {
        result1: _.pick(obj1, sharedKeys),
        result2: _.pick(obj2, sharedKeys)
    };
}