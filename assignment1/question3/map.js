function map(array , action) {
    var _counter = 0;
    var temp_array = [array.length];
    while (_counter<array.length)
    {
       temp_array[_counter]= action(array[_counter]);
        _counter++;
    }
    return temp_array;
}

var square = function (array_item) {
    return (array_item * array_item);
}

console.log(map([1,2,3,4],square));