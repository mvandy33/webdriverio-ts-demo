import * as _ from 'lodash';

/**
 * Navigate to the app start page
 */
export async function navigate() {
    await browser.url(process.env.ENVIRONMENT === 'test' ? '/app/' : '/');
    await removeAds();
}

export async function removeAds() {
    await browser.execute(`
        ads = Array.from(document.querySelectorAll('[class*="adblock"]'));
        ads = ads.concat(Array.from(document.querySelectorAll('[id*="google_ads"]')));
        for (let ad of ads){
            ad.remove();
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