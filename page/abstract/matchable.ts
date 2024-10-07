export default interface Matchable {
    getInfo(): Promise<object>;
    isMatch(expected: object): Promise<boolean>;
}