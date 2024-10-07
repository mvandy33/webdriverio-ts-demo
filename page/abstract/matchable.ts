export default interface Matchable {
    getInfo(): Promise<object>;
    isMatch(info: object): Promise<boolean>;
}