import { BasicItem } from "./BasicItem";

export interface AdvancedItem extends BasicItem{

    market_cap_rank: number;
    current_price: number;
    price_change_percentage_1h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    market_cap: number;
    market_cap_change_percentage_24h: number;

}