import { MatchServiceI } from "./MatchServiceI";
import { BasicCrypto } from "../items/BasicCrypto";
const https = require('https');

export class MatchCryptosService implements MatchServiceI{

    // La fonction récupère le triplet id, symbol et name pour chaque crypto supportée par l'API
    // J'ai choisi de laisser la donnée récupérée en objet JSON au lieu de créer un objet spécial pour chaque crypto
    // Vu qu'il y a + de 5000 cryptos supportées j'ai jugé que ça allait surcharger l'application
    // Et aussi parce que dès l'étape suivante on réduit le nombre de cryptos à combien l'utilisateur en a rentré, et ça sera rarement très élevé (10 environ)
    createIndex():any{

        // J'utilise une promesse puisqu'on effectue une requête HTTP. 
        // Cela permettra d'attendre que cette fonction ait finie avant de faire autre chose
        return new Promise((resolve,reject) => {

            var options = {
                host: 'api.coingecko.com',
                path: '/api/v3/coins/list'
            };

            var req = https.get(options, function (res:any) {
                // Si on n'a pas un bon code HTTP la requête a échouée, on renvoie une erreur
                if (res.statusCode < 200 || res.statusCode >= 300) {
                    return reject(new Error('statusCode=' + res.statusCode));
                }

                var json = '';

                // Récupération des données de la requête
                res.on('data', function (chunk:any) {
                    json += chunk;
                });

                // On Parse les données en JSON pour pouvoir les lire facilement plus tard
                res.on('end', function () {
                    try {
                        var dico = JSON.parse(json);
                    } catch (e) {
                        reject(e);
                    }
    
                resolve(dico);
                });

            }).on('error', function (err:any) {
                reject(err);
            }).end();

        });

    };


    // matchId va associer les cryptos entrées par l'utilisateur, à un triplet (id,symbol,name) qui leur correspond dans l'index de l'API
    // Avec ces informations on va créer un objet BasicCrypto par argument, qui contiendra les 3 informations associés à la crypto
    // Il faut passer par cet étape car ce que rentre l'utilisateur correspond à la variable symbol de la crypto dans l'index (ex: btc)
    // Or pour faire une requête afin de récupérer prix, rank, etc... il nous faut son id (ex: bitcoin)
    async matchId(args: Array<string>): Promise<Array<BasicCrypto>>{

        // On attend que l'index soit crée
        var dico:any = await this.createIndex();
            
        let result = new Array<BasicCrypto>();
        
        // Pour chaque crypto dans notre index
        for(const element of dico){
            // Pour chaque crypto entrée par l'utilisateur
            for(const arg of args){
                // On créé une BasicCrypto correspondant au triplet dans l'index
                if(arg.toLowerCase()==element.symbol){
                    let crypto = new BasicCrypto(element.id,element.symbol,element.name);
                    result.push(crypto);
                }
            }
        }

        return result;
    }

}