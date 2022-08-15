import {Num} from "decimalsystem";
const obj={
    volvo:2,
    saab:16,
    opel:8
}
function convert(from,to,input){
    const x=new Num({num: input, base: obj[from]}).toBase(obj[to]).toString();
    return x;
}
export default convert;
export {convert};
// var x=new Num(1234).toBase(2).toString();