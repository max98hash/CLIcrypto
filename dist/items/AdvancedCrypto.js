"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvancedCrypto = void 0;
var AdvancedCrypto = /** @class */ (function () {
    function AdvancedCrypto(rank, price, price1h, price24h, price7d, market_cap, market_cap24h, id, symbol, name) {
        this.market_cap_rank = rank;
        this.current_price = price;
        this.price_change_percentage_1h = price1h;
        this.price_change_percentage_24h = price24h;
        this.price_change_percentage_7d = price7d;
        this.market_cap = market_cap;
        this.market_cap_change_percentage_24h = market_cap24h;
        this.id = id;
        this.symbol = symbol;
        this.name = name;
    }
    return AdvancedCrypto;
}());
exports.AdvancedCrypto = AdvancedCrypto;
//# sourceMappingURL=AdvancedCrypto.js.map