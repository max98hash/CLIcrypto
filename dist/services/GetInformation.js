"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInformations = void 0;
var AdvancedCrypto_1 = require("../items/AdvancedCrypto");
var https = require('https');
var GetInformations = /** @class */ (function () {
    function GetInformations() {
    }
    // Récupère les informations de marché (rank, price, etc...) pour une crypto (BasicCrypto) correspondante
    GetInformations.prototype.getInformations1Crypto = function (crypto) {
        // La promise permettra d'attendre que la requête soit finie avant de faire autre chose
        return new Promise(function (resolve, reject) {
            var options = {
                host: 'api.coingecko.com',
                path: '/api/v3/coins/' + crypto.id + '?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false'
            };
            var req = https.get(options, function (res) {
                // Si il y a un problème lors de la requête on renvoie une erreur
                if (res.statusCode < 200 || res.statusCode >= 300) {
                    return reject(new Error('statusCode=' + res.statusCode));
                }
                var json = '';
                var market_cap_rank;
                var current_price;
                var price_change_percentage_1h;
                var price_change_percentage_24h;
                var price_change_percentage_7d;
                var market_cap;
                var market_cap_change_percentage_24h;
                //On récupère les données de la requête
                res.on('data', function (chunk) {
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
                    }
                    catch (e) {
                        //console.log('Error parsing JSON!');
                        reject(e);
                    }
                    // On créé une crypto plus évoluée (AdvancedCrypto) avec ces informations
                    var ad_crypto = new AdvancedCrypto_1.AdvancedCrypto(market_cap_rank, current_price, price_change_percentage_1h, price_change_percentage_24h, price_change_percentage_7d, market_cap, market_cap_change_percentage_24h, crypto.id, crypto.symbol, crypto.name);
                    resolve(ad_crypto);
                });
            }).on('error', function (err) {
                reject(err);
            }).end();
        });
    };
    // Renvoie, pour chaque BasicCrypto, l'AdvancedCrypto correspondante
    GetInformations.prototype.getAllInformations = function (cryptos) {
        return __awaiter(this, void 0, void 0, function () {
            var advancedCryptos, _i, cryptos_1, crypto_1, ad_crypto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        advancedCryptos = new Array();
                        _i = 0, cryptos_1 = cryptos;
                        _a.label = 1;
                    case 1:
                        if (!(_i < cryptos_1.length)) return [3 /*break*/, 4];
                        crypto_1 = cryptos_1[_i];
                        return [4 /*yield*/, this.getInformations1Crypto(crypto_1)];
                    case 2:
                        ad_crypto = _a.sent();
                        advancedCryptos.push(ad_crypto);
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, advancedCryptos];
                }
            });
        });
    };
    return GetInformations;
}());
exports.GetInformations = GetInformations;
//# sourceMappingURL=GetInformation.js.map