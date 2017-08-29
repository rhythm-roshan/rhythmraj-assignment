function for_Each(array , action) {
    var _counter = 0;
    while (_counter<array.length)
    {
        action(array[_counter]);
        _counter++;
    }
}

var square = function (array_item) {
    console.log(array_item * array_item);
}

for_Each([1,2,3,4],square);