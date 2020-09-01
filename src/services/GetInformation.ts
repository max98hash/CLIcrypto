import { AdvancedCrypto } from "../items/AdvancedCrypto";
import { BasicCrypto } from "../items/BasicCrypto";
import { GetInformationsI } from "./GetInformationsI";

const https = require('https');

export class GetInformations implements GetInformationsI{


    // Récupère les informations de marché (rank, price, etc...) pour une crypto (BasicCrypto) correspondante
    getInformations1Crypto(crypto: BasicCrypto): Promise<AdvancedCrypto>{
    
        // La promise permettra d'attendre que la requête soit finie avant de faire autre chose
        return new Promise((resolve,reject) => {
    
            var options = {
                host: 'api.coingecko.com',
                path: '/api/v3/coins/'+crypto.id+'?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false'
            };
    
            var req = https.get(options, function (res:any) {
                // Si il y a un problème lors de la requête on renvoie une erreur
                if (res.statusCode < 200 || res.statusCode >= 300) {
                    return reject(new Error('statusCode=' + res.statusCode));
                }
    
                var json = '';

                let market_cap_rank: number;
                let current_price: number;
                let price_change_percentage_1h: number;
                let price_change_percentage_24h: number;
                let price_change_percentage_7d: number;
                let market_cap: number;
                let market_cap_change_percentage_24h: number;
    
                //On récupère les données de la requête
                res.on('data', function (chunk:any) {
                    json += chunk;
                });
    
                res.on('end', function () {
                    try {
                        // On parse les données pour pouvoir les lire
                        var temp = JSON.parse(json);
                        //On extrait les informations que l'on souhaite des données récupérées
                        market_cap_rank = temp.market_cap_rank;
                        current_price = temp.market_data.current_price.eur;
                        price_change_percentage_1h = temp.market_data.price_change_percentage_1h_in_currency.eur;
                        price_change_percentage_24h = temp.market_data.price_change_percentage_24h_in_currency.eur;
                        price_change_percentage_7d = temp.market_data.price_change_percentage_7d_in_currency.eur;
                        market_cap = temp.market_data.market_cap.eur;
                        market_cap_change_percentage_24h = temp.market_data.market_cap_change_percentage_24h_in_currency.eur;
                    } catch (e) {
                        //console.log('Error parsing JSON!');
                        reject(e);
                    }
     
                // On créé une crypto plus évoluée (AdvancedCrypto) avec ces informations
                let ad_crypto = new AdvancedCrypto(market_cap_rank,current_price,price_change_percentage_1h,price_change_percentage_24h,price_change_percentage_7d,market_cap,market_cap_change_percentage_24h,crypto.id,crypto.symbol,crypto.name);
                resolve(ad_crypto);
                });
    
            }).on('error', function (err:any) {
                reject(err);
            }).end();
    
        });
    
    }

    // Renvoie, pour chaque BasicCrypto, l'AdvancedCrypto correspondante
    async getAllInformations(cryptos: Array<BasicCrypto>): Promise<Array<AdvancedCrypto>>{
        
        let advancedCryptos = new Array<AdvancedCrypto>();

        for(const crypto of cryptos){
            var ad_crypto = await this.getInformations1Crypto(crypto);
            advancedCryptos.push(ad_crypto);
        }

        return advancedCryptos;
    }

}