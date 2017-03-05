var async = require('async'),
    fork = require('child_process'),
    arraysize = 100000000,
//    arraysize = 10,
    array = [],
    secondArray = [],
    arraySliced = [],
    startTime, endTime, resultTime;

function populateArray (arrayToPopulate, arrayToPopulateSize) {
    for (var i = 0; i < arrayToPopulateSize; i++){
        arrayToPopulate.push(Math.round(Math.random() * 10));
    }
    return array;
}
function sortArrayOddEven (arrayToSort) {
    var arrayToSortLength = arrayToSort.length,
        temp, i, j, lastOddPosition;
    for (i = 0; i < arrayToSortLength; i++){
        if (arrayToSort[i] % 2 === 0){
            for (j = (lastOddPosition === undefined) ? i + 1 : lastOddPosition;
                j < arrayToSortLength;j++){
                if (arrayToSort[j] % 2 != 0){
                    temp = arrayToSort[i];
                    arrayToSort[i] = arrayToSort[j];
                    arrayToSort[j] = temp;
                    lastOddPosition = j;
                    break;
                }
            }
        }
    }
    return arrayToSort;
}
function isArrayOddEvenSorted (arrayToCheck) {
    var arrayToCheckLength = arrayToCheck.length;
    for (var i = 0; i < arrayToCheckLength; i++){
        if (arrayToCheck[i] % 2 === 0){
            for (j = i + 1; j < arrayToCheckLength; j++){
                if (arrayToCheck[j] % 2 != 0){
                    return false;
                }
            }
            return true;
        }
    }
}
function asyncSortArrayOddEven (arrayToSort) {
    return false;
}
function sliceArrayIntoFour (arrayToSlice) {
    //todo: parametrize parts size
    var slicedArray = [];
    slicedArray.push(arrayToSlice.slice(0,24999999));
    slicedArray.push(arrayToSlice.slice(25000000,49999999));
    slicedArray.push(arrayToSlice.slice(50000000,24999999));
    slicedArray.push(arrayToSlice.slice(75000000,10000000));
    return slicedArray;
}

//----------------EXECUTION-------------------------

startTime = Date.now();
populateArray(array, arraysize);
endTime = Date.now();
resultTime = endTime - startTime;
secondArray = array.slice(0, array.length);
console.log('\nGenerating new array...');
console.log('\n\tArray generation time = ' + resultTime.toString() + 'ms');
console.log('\tArray is sorted: ' + isArrayOddEvenSorted(array));
console.log('\tUnsorted array length: ' + array.length);
//console.log('Unsorted array: ' + secondArray);
console.log('\nSorting array...\n');

startTime = Date.now();
sortArrayOddEven(array);
endTime = Date.now();
resultTime = endTime - startTime;
console.log('\tArray sort time = ' + resultTime.toString() + 'ms');
console.log('\tArray is sorted: ' + isArrayOddEvenSorted(array));
console.log('\tArray length = ' + array.length);
//console.log('Sorted array: ' + array + '\n');

console.log('\nSlicing array into four...')
arraySliced = sliceArrayIntoFour(secondArray);

console.log('\nAsync sorting array...\n')

startTime = Date.now();
asyncSortArrayOddEven(secondArray);
endTime = Date.now();
resultTime = endTime - startTime;
console.log('\tArray sort time = ' + resultTime.toString() + 'ms');
console.log('\tArray is sorted: ' + isArrayOddEvenSorted(secondArray));
console.log('\tArray length = ' + secondArray.length);
//console.log('Sorted array: ' + secondArray);
