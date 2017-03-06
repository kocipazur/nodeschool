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
process.on('message', function(array) {
	process.send(sortArrayOddEven(array));
	process.exit();
});
//console.log(sortArrayOddEven([1,2,3,4,5,6,7,8]).toString());