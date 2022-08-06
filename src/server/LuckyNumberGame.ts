export default class LuckyNumberGame{
    public LuckyNumber: {[id: string]:number} = {};

    constructor(){}

    public GetWinner(number: number): string[]{
        let ret : string[] = [];
        for (let key in this.LuckyNumber) {
            if(number === this.LuckyNumber[key]){
                ret.push(key);
            }
        }
        return ret;
    }
}