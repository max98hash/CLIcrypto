import { BasicCrypto } from "../items/BasicCrypto";

export interface MatchServiceI{

    createIndex(): Promise<any>;

    matchId(args: Array<string>): Promise<Array<BasicCrypto>>;

}