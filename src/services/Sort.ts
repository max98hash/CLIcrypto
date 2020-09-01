import { AdvancedCrypto } from "../items/AdvancedCrypto";

export class Sort{

    // Fonction de tri fusion récupérée ici : https://medium.com/javascript-in-plain-english/javascript-merge-sort-3205891ac060

    mergeSort(unsortedArray: Array<AdvancedCrypto>): Array<AdvancedCrypto> {
        // No need to sort the array if the array only has one element or empty
        if (unsortedArray.length <= 1) {
        return unsortedArray;
        }
        // In order to divide the array in half, we need to figure out the middle
        const middle = Math.floor(unsortedArray.length / 2);
    
        // This is where we will be dividing the array into left and right
        const left = unsortedArray.slice(0, middle);
        const right = unsortedArray.slice(middle);
    
        // Using recursion to combine the left and right
        return this.merge(
            this.mergeSort(left), this.mergeSort(right)
        );
    }


    // Merge the two arrays: left and right
    merge (left:Array<AdvancedCrypto>, right:Array<AdvancedCrypto>): Array<AdvancedCrypto>{
        let resultArray = new Array<AdvancedCrypto>(), leftIndex = 0, rightIndex = 0;
    
        // We will concatenate values into the resultArray in order
        while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex].market_cap_rank < right[rightIndex].market_cap_rank) {
            resultArray.push(left[leftIndex]);
            leftIndex++; // move left array cursor
        } else {
            resultArray.push(right[rightIndex]);
            rightIndex++; // move right array cursor
        }
        }
    
        // We need to concat here because there will be one element remaining
        // from either left OR the right
        return resultArray
                .concat(left.slice(leftIndex))
                .concat(right.slice(rightIndex));
    }

}