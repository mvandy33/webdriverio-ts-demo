import * as cssToXpath from "css-to-xpath";

export const by = {
    id: (id: string): string => {
        return `[id="${id}"]`;
    },

    css: (css: string): string => {
        return css;
    },

    xpath: (xpath: string): string => {
        return xpath;
    },

    isXpath: (locator: string): boolean => {
        return locator.includes('/');
    }
};

export function combine(parent: string, child: string) {
    if (!parent) {
        return child;
    }
    if (!child) {
        return parent;
    }
    if (by.isXpath(parent) || by.isXpath(child)) { // Convert to xpath and combine
        parent = by.isXpath(parent) ? parent : cssToXpath(parent);
        child = by.isXpath(child) ? child : cssToXpath(child);
        return `${parent}${child.startsWith('/') ? '' : '/'}${child}`;
    } else { // Combine css locators
        return `${parent} ${child}`;
    }
}