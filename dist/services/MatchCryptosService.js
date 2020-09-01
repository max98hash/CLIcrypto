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
exports.MatchCryptosService = void 0;
var BasicCrypto_1 = require("../items/BasicCrypto");
var https = require('https');
var MatchCryptosService = /** @class */ (function () {
    function MatchCryptosService() {
    }
    // La fonction récupère le triplet id, symbol et name pour chaque crypto supportée par l'API
    // J'ai choisi de laisser la donnée récupérée en objet JSON au lieu de créer un objet spécial pour chaque crypto
    // Vu qu'il y a + de 5000 cryptos supportées j'ai jugé que ça allait surcharger l'application
    // Et aussi parce que dès l'étape suivante on réduit le nombre de cryptos à combien l'utilisateur en a rentré, et ça sera rarement très élevé (10 environ)
    MatchCryptosService.prototype.createIndex = function () {
        // J'utilise une promesse puisqu'on effectue une requête HTTP. 
        // Cela permettra d'attendre que cette fonction ait finie avant de faire autre chose
        return new Promise(function (resolve, reject) {
            var options = {
                host: 'api.coingecko.com',
                path: '/api/v3/coins/list'
            };
            var req = https.get(options, function (res) {
                // Si on n'a pas un bon code HTTP la requête a échouée, on renvoie une erreur
                if (res.statusCode < 200 || res.statusCode >= 300) {
                    return reject(new Error('statusCode=' + res.statusCode));
                }
                var json = '';
                // Récupération des données de la requête
                res.on('data', function (chunk) {
                    json += chunk;
                });
                // On Parse les données en JSON pour pouvoir les lire facilement plus tard
                res.on('end', function () {
                    try {
                        var dico = JSON.parse(json);
                    }
                    catch (e) {
                        reject(e);
                    }
                    resolve(dico);
                });
            }).on('error', function (err) {
                reject(err);
            }).end();
        });
    };
    ;
    // matchId va associer les cryptos entrées par l'utilisateur, à un triplet (id,symbol,name) qui leur correspond dans l'index de l'API
    // Avec ces informations on va créer un objet BasicCrypto par argument, qui contiendra les 3 informations associés à la crypto
    // Il faut passer par cet étape car ce que rentre l'utilisateur correspond à la variable symbol de la crypto dans l'index (ex: btc)
    // Or pour faire une requête afin de récupérer prix, rank, etc... il nous faut son id (ex: bitcoin)
    MatchCryptosService.prototype.matchId = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var dico, result, _i, dico_1, element, _a, args_1, arg, crypto_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.createIndex()];
                    case 1:
                        dico = _b.sent();
                        result = new Array();
                        // Pour chaque crypto dans notre index
                        for (_i = 0, dico_1 = dico; _i < dico_1.length; _i++) {
                            element = dico_1[_i];
                            // Pour chaque crypto entrée par l'utilisateur
                            for (_a = 0, args_1 = args; _a < args_1.length; _a++) {
                                arg = args_1[_a];
                                // On créé une BasicCrypto correspondant au triplet dans l'index
                                if (arg.toLowerCase() == element.symbol) {
                                    crypto_1 = new BasicCrypto_1.BasicCrypto(element.id, element.symbol, element.name);
                                    result.push(crypto_1);
                                }
                            }
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return MatchCryptosService;
}());
exports.MatchCryptosService = MatchCryptosService;
//# sourceMappingURL=MatchCryptosService.js.map