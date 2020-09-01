import { DisplayI } from "./DisplayI";
import { AdvancedCrypto } from "../items/AdvancedCrypto";
import 'colorts/lib/string';

const Table = require('cli-table');

export class Display implements DisplayI{

    // Affiche les informations de nos cryptos (AdvancedCrypto) sous forme de table via la librairie 'cli-table'
    displayAllInformations(cryptos: Array<AdvancedCrypto>){

        // Paramètres de style pour les cases de la table
        const table = new Table({
            chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                    , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                    , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                    , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
        });
          
        // Headers de chaque colonne
        table.push(
            ['Rank'.yellow, 'Coin'.yellow, 'Name'.yellow, 'Price (EUR)'.yellow, 'Change 1H (%)'.yellow, 'Change 24H (%)'.yellow, 'Change 7D (%)'.yellow, 'Market Cap (EUR)'.yellow, 'Market Cap Change (%)'.yellow]
        );
    
        // Pour chaque AdvancedCrypto on récupère ses infos
        for(const crypto of cryptos){

            let rank = '#'+crypto.market_cap_rank;
            let coin = crypto.symbol.toUpperCase();
            let name = crypto.name;
            let price = crypto.current_price;
            let market_cap = crypto.market_cap;
            let market_cap_24h = crypto.market_cap_change_percentage_24h.toString();
            let change_1h = crypto.price_change_percentage_1h.toString();
            let change_24h = crypto.price_change_percentage_24h.toString();
            let change_7d = crypto.price_change_percentage_7d.toString();

            // Si le pourcentage est positif on affiche en vert sinon en rouge
            if(parseFloat(change_1h)<0){change_1h=change_1h.red}else{change_1h=change_1h.green}
            if(parseFloat(change_24h)<0){change_24h=change_24h.red}else{change_24h=change_24h.green}
            if(parseFloat(change_7d)<0){change_7d=change_7d.red}else{change_7d=change_7d.green}
            if(parseFloat(market_cap_24h)<0){market_cap_24h=market_cap_24h.red}else{market_cap_24h=market_cap_24h.green}
    
    
            table.push([rank, coin, name, price+'€', change_1h, change_24h, change_7d, market_cap.toLocaleString("de"), market_cap_24h]);
        }
        
        // On affiche la table
        console.log(table.toString());
        console.log("Update every 5 seconds");
        console.log("Press CTRL+C to stop");
    }

}