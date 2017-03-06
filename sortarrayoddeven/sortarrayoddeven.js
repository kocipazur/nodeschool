var async = require('async'),
	fork = require('child_process').fork,
	wait = require('wait.for'),
	sortarrayworker0 = fork('sortarrayworker.js'),
	sortarrayworker1 = fork('sortarrayworker.js'),
	sortarrayworker2 = fork('sortarrayworker.js'),
	sortarrayworker3 = fork('sortarrayworker.js'),
    arraysize = 100000000,
//    arraysize = 10,
    array = [],
    secondArray = [],
    arraySliced = [],
	res0 = [], res1 = [], res2 = [], res3 = [],
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
    async.parallel([
    function (callback) {
		sortarrayworker0.send(sliceArrayIntoFour(arrayToSort)[0]);
		sortarrayworker0.on('message', function (response) {
			callback(null, response);
		})
	},
    function (callback) {
		sortarrayworker1.send(sliceArrayIntoFour(arrayToSort)[1]);
		sortarrayworker1.on('message', function (response) {
			callback(null, response);
		})
	},
    function (callback) {
		sortarrayworker2.send(sliceArrayIntoFour(arrayToSort)[2]);
		sortarrayworker2.on('message', function (response) {
			callback(null, response);
		})
	},
	function (callback) {
		sortarrayworker3.send(sliceArrayIntoFour(arrayToSort)[3]);
		sortarrayworker3.on('message', function (response) {
			callback(null, response);
		})
	},
	], function (err, results) {
		if (err) return console.log(err);
		arrayToSort = [];
		for (i of results) {
			arrayToSort = arrayToSort.concat(i);
			i.length;
		}
		console.log(arrayToSort.length);
	});
}
function sliceArrayIntoFour (arrayToSlice) {
    //todo: parametrize parts size
    var slicedArray = [];
    slicedArray.push(arrayToSlice.slice(0,24999999));
    slicedArray.push(arrayToSlice.slice(25000000,49999999));
    slicedArray.push(arrayToSlice.slice(50000000,74999999));
    slicedArray.push(arrayToSlice.slice(75000000,100000000));
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

console.log('\nAsync sorting array...\n');

startTime = Date.now();
asyncSortArrayOddEven(secondArray);
endTime = Date.now();
resultTime = endTime - startTime;
console.log('\tArray sort time = ' + resultTime.toString() + 'ms');
console.log('\tArray is sorted: ' + isArrayOddEvenSorted(secondArray));
console.log('\tArray length = ' + secondArray.length);
//console.log('Sorted array: ' + secondArray);