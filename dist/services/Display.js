"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Display = void 0;
require("colorts/lib/string");
var Table = require('cli-table');
var Display = /** @class */ (function () {
    function Display() {
    }
    // Affiche les informations de nos cryptos (AdvancedCrypto) sous forme de table via la librairie 'cli-table'
    Display.prototype.displayAllInformations = function (cryptos) {
        // Paramètres de style pour les cases de la table
        var table = new Table({
            chars: { 'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗',
                'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝',
                'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼',
                'right': '║', 'right-mid': '╢', 'middle': '│' }
        });
        // Headers de chaque colonne
        table.push(['Rank'.yellow, 'Coin'.yellow, 'Name'.yellow, 'Price (EUR)'.yellow, 'Change 1H (%)'.yellow, 'Change 24H (%)'.yellow, 'Change 7D (%)'.yellow, 'Market Cap (EUR)'.yellow, 'Market Cap Change (%)'.yellow]);
        // Pour chaque AdvancedCrypto on récupère ses infos
        for (var _i = 0, cryptos_1 = cryptos; _i < cryptos_1.length; _i++) {
            var crypto_1 = cryptos_1[_i];
            var rank = '#' + crypto_1.market_cap_rank;
            var coin = crypto_1.symbol.toUpperCase();
            var name_1 = crypto_1.name;
            var price = crypto_1.current_price;
            var market_cap = crypto_1.market_cap;
            var market_cap_24h = crypto_1.market_cap_change_percentage_24h.toString();
            var change_1h = crypto_1.price_change_percentage_1h.toString();
            var change_24h = crypto_1.price_change_percentage_24h.toString();
            var change_7d = crypto_1.price_change_percentage_7d.toString();
            // Si le pourcentage est positif on affiche en vert sinon en rouge
            if (parseFloat(change_1h) < 0) {
                change_1h = change_1h.red;
            }
            else {
                change_1h = change_1h.green;
            }
            if (parseFloat(change_24h) < 0) {
                change_24h = change_24h.red;
            }
            else {
                change_24h = change_24h.green;
            }
            if (parseFloat(change_7d) < 0) {
                change_7d = change_7d.red;
            }
            else {
                change_7d = change_7d.green;
            }
            if (parseFloat(market_cap_24h) < 0) {
                market_cap_24h = market_cap_24h.red;
            }
            else {
                market_cap_24h = market_cap_24h.green;
            }
            table.push([rank, coin, name_1, price + '€', change_1h, change_24h, change_7d, market_cap.toLocaleString("de"), market_cap_24h]);
        }
        // On affiche la table
        console.log(table.toString());
        console.log("Update every 5 seconds");
        console.log("Press CTRL+C to stop");
    };
    return Display;
}());
exports.Display = Display;
//# sourceMappingURL=Display.js.map