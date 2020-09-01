"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sort = void 0;
var Sort = /** @class */ (function () {
    function Sort() {
    }
    // Fonction de tri fusion récupérée ici : https://medium.com/javascript-in-plain-english/javascript-merge-sort-3205891ac060
    Sort.prototype.mergeSort = function (unsortedArray) {
        // No need to sort the array if the array only has one element or empty
        if (unsortedArray.length <= 1) {
            return unsortedArray;
        }
        // In order to divide the array in half, we need to figure out the middle
        var middle = Math.floor(unsortedArray.length / 2);
        // This is where we will be dividing the array into left and right
        var left = unsortedArray.slice(0, middle);
        var right = unsortedArray.slice(middle);
        // Using recursion to combine the left and right
        return this.merge(this.mergeSort(left), this.mergeSort(right));
    };
    // Merge the two arrays: left and right
    Sort.prototype.merge = function (left, right) {
        var resultArray = new Array(), leftIndex = 0, rightIndex = 0;
        // We will concatenate values into the resultArray in order
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex].market_cap_rank < right[rightIndex].market_cap_rank) {
                resultArray.push(left[leftIndex]);
                leftIndex++; // move left array cursor
            }
            else {
                resultArray.push(right[rightIndex]);
                rightIndex++; // move right array cursor
            }
        }
        // We need to concat here because there will be one element remaining
        // from either left OR the right
        return resultArray
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex));
    };
    return Sort;
}());
exports.Sort = Sort;
//# sourceMappingURL=Sort.js.map