"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LuckyNumberGame {
    constructor() {
        this.LuckyNumber = {};
    }
    GetWinner(number) {
        let ret = [];
        for (let key in this.LuckyNumber) {
            if (number === this.LuckyNumber[key]) {
                ret.push(key);
            }
        }
        return ret;
    }
}
exports.default = LuckyNumberGame;
//# sourceMappingURL=LuckyNumberGame.js.map