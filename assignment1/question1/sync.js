function setTimeout(callback, n){
    console.log("Please Wait for 10sec");
    var start = new Date();
    while((new Date())-start <n){

    }
    callback("Callback called");
}

setTimeout(console.log, 10000);