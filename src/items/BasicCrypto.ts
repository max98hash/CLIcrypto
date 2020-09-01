import { BasicItem } from "./BasicItem";

export class BasicCrypto implements BasicItem{

    // L'objet BasicCrypto contient les 3 informations basiques d'une crypto : id, symbol et name
    id: string;
    symbol: string;
    name: string;

    constructor(id: string, symbol: string, name: string){
        this.id=id;
        this.symbol=symbol;
        this.name=name;
    }

}