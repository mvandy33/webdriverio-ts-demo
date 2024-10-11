export default class Player {

    info: {
        firstName?: string,
        lastName?: string,
        fullName?: string,
        nickname?: string,
        hallOfFame?: boolean
    }

    constructor(info: {
        firstName?: string,
        lastName?: string,
        fullName?: string,
        nickname?: string,
        hallOfFame?: boolean
    }) {
        this.info = info;

        // If fullName is not defined, try to construct it
        if (!info.fullName && info.firstName && info.lastName) {
            this.info.fullName = `${info.firstName} ${info.lastName}`;
        }
    }
}