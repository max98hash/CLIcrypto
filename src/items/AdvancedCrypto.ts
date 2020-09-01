import { AdvancedItem } from "./AdvancedItem";

export class AdvancedCrypto implements AdvancedItem{

    // L'objet AdvancedCrypto, en plus des 3 infos principales d'une BasicCrypto
    // Contient tous les informations lié au marché à afficher
    market_cap_rank: number;
    current_price: number;
    price_change_percentage_1h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    market_cap: number;
    market_cap_change_percentage_24h: number;
    id: string;
    symbol: string;
    name: string;

    constructor(rank: number, price:number, price1h: number, price24h: number, price7d: number, market_cap: number, market_cap24h: number, id : string, symbol: string, name: string){
        this.market_cap_rank=rank;
        this.current_price=price;
        this.price_change_percentage_1h=price1h;
        this.price_change_percentage_24h=price24h;
        this.price_change_percentage_7d=price7d;
        this.market_cap=market_cap;
        this.market_cap_change_percentage_24h=market_cap24h;
        this.id=id;
        this.symbol=symbol;
        this.name=name;
    }

}