import {Num} from "decimalsystem";
const obj={
    Binary:2,
    Hexadecimal:16,
    Octal:8,
    Decimal:10
}
function convert(from,to,input){
    const x=new Num({num: input, base: obj[from]}).toBase(obj[to]).toString();
    return x;
}
export default convert;
export {convert};
// var x=new Num(1234).toBase(2).toString();