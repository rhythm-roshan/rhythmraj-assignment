var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var todo_db = require("./seed.js");



app.use("/",express.static(__dirname+"/public") , function (req,res,next) {
    console.log("WOW");
    next()});

app.use("/",bodyParser.urlencoded({extended : false}));
app.use("/", function (req,res,next) {


next();

})

app.get("/api/todos",function (req,res) {

    res.json(todo_db.todos);
})
Object.objsize = function(Myobj) {
    var osize = 0, key;
    for (key in Myobj) {
        if (Myobj.hasOwnProperty(key)) osize++;
    }
    return osize;
};
app.get("/api/todos/active",function (req,res) {
    var temp_json = [];
    for(var active_id = 1 ;  active_id <= Object.objsize(todo_db.todos) ;active_id++)
    {
        var todo = todo_db.todos[active_id]
        if ( todo.status == todo_db.StatusEnum.ACTIVE)
        {
            var x = {[active_id]:todo}
            temp_json.push(x);
        }
    }
    res.json(temp_json);
})



app.get("/api/todos/delete",function (req,res) {
    var temp_json = [];
    for(var active_id = 1 ;  active_id <= Object.objsize(todo_db.todos) ;active_id++)
    {
        var todo = todo_db.todos[active_id]
        if ( todo.status == todo_db.StatusEnum.DELETED)
        {
            var x = {[active_id]:todo}
            temp_json.push(x);
        }
    }
    res.json(temp_json);
})

app.get("/api/todos/complete",function (req,res) {
    var temp_json = [];
    for(var active_id = 1 ;  active_id <= Object.objsize(todo_db.todos) ;active_id++)
    {
        var todo = todo_db.todos[active_id]
        if ( todo.status == todo_db.StatusEnum.COMPLETE)
        {
            var x = {[active_id]:todo}
            temp_json.push(x);
        }
    }
    res.json(temp_json);
})
app.delete("/api/todos/:id",function (req,res) {
var del_id = req.params.id;

var todo = todo_db.todos[del_id];

if(!todo)
{
    res.status(400).json({error: "Todo doesn't exist"});
}
else
{
    todo.status = todo_db.StatusEnum.DELETED;
    res.json(todo_db.todos);
}

})


app.post("/api/todos",function (req,res) {

    var todo = req.body.todo_title;

    if(!todo || todo == "" || todo.trim() == "")
    {
        res.status(400).json({error: "Todo title Can't be empty"});
    }
    else
    {

     var new_todo_object = {
         title : req.body.todo_title,
         status : todo_db.StatusEnum.ACTIVE
     }

     todo_db.todos[todo_db.next_todo_id++]=new_todo_object;
     res.json(todo_db.todos);
    }


})

app.put("/api/todos/:id",function (req,res) {

    var del_id = req.params.id;

    var todo = todo_db.todos[del_id];

    if(!todo)
    {
        res.status(400).json({error: "Can't modify a todo that doesnt exist"});
    }
    else
    {
        var todo_title = req.body.todo_title;
        if(todo_title && todo_title!="" && todo_title.trim()!="")
        {
            todo_title = todo_title;
        }

        var todo_status = req.body.todo_status;
        if(todo_status && (todo_status==todo_db.StatusEnum.ACTIVE || todo_status==todo_db.StatusEnum.COMPLETE))

        {
            todo.status=todo_status;
        }

        res.json(todo_db.todos);
    }


})

app.put("/api/todos/complete/:id",function (req,res) {

    var del_id = req.params.id;

    var todo = todo_db.todos[del_id];

    if(!todo || todo.status != todo_db.StatusEnum.COMPLETE )
    {
        res.status(400).json({error: "Can't modify a todo that doesnt exist"});
    }
    else
    {
        var todo_title = req.body.todo_title;
        if(todo_title && todo_title!="" && todo_title.trim()!="")
        {
            todo_title = todo_title;
        }

        var todo_status = req.body.todo_status;
        if(todo_status && todo_status==todo_db.StatusEnum.ACTIVE)

        {
            todo.status=todo_status;
        }

        res.json(todo_db.todos);
    }


})

app.put("/api/todos/active/:id",function (req,res) {

    var del_id = req.params.id;

    var todo = todo_db.todos[del_id];

    if(!todo || todo.status != todo_db.StatusEnum.COMPLETE )
    {
        res.status(400).json({error: "Can't modify a todo that doesnt exist"});
    }
    else
    {
        var todo_title = req.body.todo_title;
        if(todo_title && todo_title!="" && todo_title.trim()!="")
        {
            todo_title = todo_title;
        }

        var todo_status = req.body.todo_status;

        {
            todo.status=todo_status;
        }

        res.json(todo_db.todos);
    }


})


console.log(todo_db);

app.listen(4000);