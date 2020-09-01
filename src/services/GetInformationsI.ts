import { BasicCrypto } from "../items/BasicCrypto";
import { AdvancedCrypto } from "../items/AdvancedCrypto";

export interface GetInformationsI{

    getInformations1Crypto(crypto: BasicCrypto): Promise<AdvancedCrypto>;

    getAllInformations(cryptos: Array<BasicCrypto>): Promise<Array<AdvancedCrypto>>;


}